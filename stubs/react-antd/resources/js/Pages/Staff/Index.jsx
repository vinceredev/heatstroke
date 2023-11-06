import { debounce, pickBy } from "lodash";
import { useState, useCallback, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Table, Pagination, Input } from "antd";
import { __ } from "@/Libs/i18n";
import { router } from "@inertiajs/react";
import CreateColumn from "./Partials/Column";
import AddModal from "./Partials/AddModal";

const { Search } = Input;

export default function StaffIndex({ auth: { permissions }, staffs }) {
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
                route("staff.index"),
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
            <Head title="Staffs" />
            <div className="mx-4 md:mx-[30px] pt-[33px] min-h-screen">
                <div className="flex items-center justify-between mb-6">
                    <div className="text-xl font-bold">
                        {__("Staff Management")}
                    </div>
                    {permissions.add_staff && <AddModal />}
                </div>
                <div className="flex flex-col items-center justify-between gap-y-2 md:flex-row md:gap-y-0 mb-[10px]">
                    <div className="w-full mb-[10px] lg:w-auto lg:m-0 lg:mr-4">
                        <Search
                            allowClear
                            size="large"
                            placeholder={__("Search by name or email")}
                            onSearch={(value) =>
                                setParams({ ...params, search: value, page: 1 })
                            }
                            className="lg:w-[265px]"
                        />
                    </div>
                </div>
                <Table
                    pagination={false}
                    dataSource={staffs?.data}
                    columns={columns}
                    rowKey="id"
                />
                <div className="mt-4  flex justify-center md:justify-end">
                    <Pagination
                        showSizeChanger={false}
                        current={staffs?.meta?.current_page}
                        total={staffs?.meta?.total}
                        pageSize={staffs?.meta?.per_page ?? 1}
                        onChange={(page) => {
                            setParams({ ...params, page: page });
                        }}
                    />
                </div>
            </div>
        </>
    );
}

StaffIndex.layout = (page) => <AuthenticatedLayout children={page} />;
