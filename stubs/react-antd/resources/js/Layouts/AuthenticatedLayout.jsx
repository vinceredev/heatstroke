import { useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import { App, Layout, Menu } from "antd";
import {
    DashboardOutlined,
    LockOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import { __ } from "@/Libs/i18n";
import UserDropdown from "@/Components/UserDropdown";

const { Header, Content, Sider } = Layout;

export default function Authenticated({ children }) {
    const { notification } = App.useApp();
    const {
        auth: { permissions },
        flash,
    } = usePage().props;

    useEffect(() => {
        const isSuccess = flash.success;
        const isError = flash.error;
        const notify = isSuccess ? notification.success : notification.error;

        if (isSuccess || isError) {
            notify({
                message: isSuccess ? "Success" : "Error",
                description: isSuccess ? flash.success : flash.error,
            });
        }
    }, [flash]);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                theme="light"
                className="w-1/2 p-0 border-0 border-r border-solid"
            >
                <div className="flex h-[54px] items-center justify-start gap-2 border-0 border-b border-solid border-borderGrey bg-white md:h-[72px] md:justify-center">
                    <Link href={route("dashboard")}>
                        <ApplicationLogo className="h-5 w-auto md:h-8" />
                    </Link>
                    <h1 className="m-0">
                        <Link
                            className="hover:text-black focus:text-black text-black font-semibold"
                            href={route("dashboard")}
                        >
                            Vincere Digital
                        </Link>
                    </h1>
                </div>

                <Menu
                    theme="light"
                    defaultSelectedKeys={[String(route().current())]}
                    mode="inline"
                    items={[
                        {
                            key: "dashboard",
                            icon: <DashboardOutlined />,
                            label: (
                                <Link href={route("dashboard")}>
                                    {__("Dashboard")}
                                </Link>
                            ),
                        },
                        {
                            key: "staff.index",
                            icon: <UsergroupAddOutlined />,
                            hidden: !permissions.view_staff,
                            label: (
                                <Link href={route("staff.index")}>
                                    {__("Staff")}
                                </Link>
                            ),
                        },
                        {
                            key: "role.index",
                            icon: <LockOutlined />,
                            hidden: !permissions.view_role,
                            label: (
                                <Link href={route("role.index")}>
                                    {__("Role & Permission")}
                                </Link>
                            ),
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    className={`z-10 hidden h-[72px] w-full border-0 border-b border-solid border-borderGrey bg-white md:block`}
                >
                    <div className="flex items-center justify-end gap-x-5">
                        <UserDropdown />
                    </div>
                </Header>
                <Content className="bg-white border-0 border-solid border-borderGrey">
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
