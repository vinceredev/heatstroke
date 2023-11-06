import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState, useCallback, useEffect } from "react";
import { debounce, pickBy } from "lodash";
import CreateColumn from "./Partials/Columns";
import { __ } from "@/Libs/i18n";
import AddModal from "./Partials/AddModal";
import { Input, Pagination, Table } from "antd";

const { Search } = Input;

export default function RoleIndex({ roles, auth: { permissions } }) {
    const columns = CreateColumn();

    const [params, setParams] = useState({
        load: 10,
        page: 1,
        role: "",
        status: "",
        field: "",
        direction: "",
    });

    const reload = useCallback(
        debounce((query) => {
            router.get(
                route("role.index"),
                { ...pickBy(query), page: query.search ? 1 : query.page },
                {
                    preserveState: true,
                }
            );
        }, 150),
        []
    );

    useEffect(() => {
        reload(params);
    }, [params]);

    return (
        <>
            <Head title="Role & Permissions" />

            <div className="mx-4 md:mx-[30px] pt-[33px] min-h-screen">
                <div className="flex items-center justify-between mb-6">
                    <div className="text-xl font-bold">
                        {__("Role & Permissions")}
                    </div>
                    {permissions.add_role && <AddModal />}
                </div>
                <div className="flex flex-col items-center justify-between gap-y-2 md:flex-row md:gap-y-0 mb-[10px]">
                    <div className="w-full mb-[10px] lg:w-auto lg:m-0 lg:mr-4">
                        <Search
                            allowClear
                            size="large"
                            placeholder={__("Search by name")}
                            onSearch={(value) =>
                                setParams({ ...params, search: value, page: 1 })
                            }
                            className="lg:w-[265px]"
                        />
                    </div>
                </div>
                <Table
                    pagination={false}
                    dataSource={roles?.data}
                    columns={columns}
                    rowKey="id"
                />
                <div className="mt-4  flex justify-center md:justify-end">
                    <Pagination
                        showSizeChanger={false}
                        current={roles?.meta?.current_page}
                        total={roles?.meta?.total}
                        pageSize={roles?.meta?.per_page ?? 1}
                        onChange={(page) => {
                            setParams({ ...params, page: page });
                        }}
                    />
                </div>
            </div>
        </>
    );
}

RoleIndex.layout = (page) => <AuthenticatedLayout children={page} />;
