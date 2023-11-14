import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Link, usePage } from "@inertiajs/react";
import { Avatar, Dropdown } from "antd";
import React from "react";

export default function UserDropdown({}) {
    const { auth } = usePage().props;

    const items = [
        {
            key: "main",
            label: (
                <div className="mb-2 flex items-center justify-start gap-x-2 bg-transparent py-2">
                    <Avatar
                        className="h-11 w-11"
                        src={`https://ui-avatars.com/api/?name=${auth?.user?.name}`}
                    />
                    <div className="flex flex-col items-start justify-start">
                        <p className="text-sm leading-5 text-black m-0">
                            {auth?.user?.name}
                        </p>
                        <p className="text-xs leading-3 text-black/50 m-0">
                            {auth?.user?.email}
                        </p>
                        <p className="text-xs leading-3 text-black/50 mt-3 capitalize">
                            {auth?.user?.roles?.map(r => r.name).join(',')}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            key: "edit",
            label: (
                <Link
                    href={route("profile.edit")}
                    method="get"
                    as="button"
                    className="block border-transparent border-0 bg-transparent w-full text-left cursor-pointer py-1"
                >
                    <div className="text-sm text-black/80">Edit Profile</div>
                </Link>
            ),
            icon: <UserOutlined size={12} />,
        },
        {
            key: "logout",
            label: (
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="border-transparent block cursor-pointer py-1 text-red-500"
                >
                    <div className="text-sm">Logout</div>
                </Link>
            ),
            icon: <LogoutOutlined style={{ color: "red" }} size={12} />,
        },
    ];

    return (
        <Dropdown
            menu={{
                items,
                selectable: true,
                defaultSelectedKeys: [String(route().current())],
            }}
            placement="bottomRight"
            dropdownRender={(menu) => (
                <div className="-mt-5">{React.cloneElement(menu)}</div>
            )}
        >
            <div className="flex items-center justify-start gap-x-2 px-0 cursor-pointer">
                <Avatar
                    src={`https://ui-avatars.com/api/?name=${auth?.user?.name}`}
                />
                {auth?.user?.name}
            </div>
        </Dropdown>
    );
}
