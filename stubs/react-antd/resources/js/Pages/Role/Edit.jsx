import { Head, useForm } from "@inertiajs/react";
import { Button, Checkbox, Divider, Form, Input } from "antd";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { __ } from "@/Libs/i18n";
import React from "react";

export default function EditPage({ role, permissions }) {
    const { patch, data, setData, processing, errors } = useForm({
        id: role?.id,
        name: role?.name,
        permissions: role?.permissions?.map((p) => p.id),
    });

    const onChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = () => {
        patch(route("role.update", { id: role?.id }), {
            preserveScroll: true,
        });
    };

    const initialValues = {
        name: data?.name,
        permissions: data?.permissions,
    };

    return (
        <>
            <Head title="Edit Role & Permission" />
            <div className="min-h-screen mx-4 md:mx-[30px] pt-[33px]">
                <div className="flex items-center justify-between">
                    <div className="text-xl font-bold">
                        {__("Edit Role & Permission")}
                    </div>
                </div>
                <div className="grid grid-cols-12 w-full mb-4">
                    <div className="col-span-8">
                        <Form
                            className="mt-6"
                            onFinish={submit}
                            layout="vertical"
                            initialValues={initialValues}
                        >
                            <Form.Item
                                name="name"
                                label={__("Name")}
                                validateStatus={errors.name && "error"}
                                help={errors.name}
                                rules={[
                                    {
                                        required: true,
                                        message: errors.name,
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={onChange}
                                    placeholder={__("Name")}
                                />
                            </Form.Item>

                            <Divider />

                            <div>
                                <h3 className="font-semibold text-lg mb-4">
                                    {__("Permissions")}
                                </h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {Object.keys(permissions).map((group) => {
                                        return (
                                            <div key={group} className="p-4">
                                                <h4 className="font-semibold capitalize mb-2">
                                                    {group}
                                                </h4>
                                                <ul>
                                                    {permissions[group].map(
                                                        (permission) => {
                                                            const isExists =
                                                                data.permissions.includes(
                                                                    permission.id
                                                                );

                                                            const removed =
                                                                data.permissions.filter(
                                                                    (p) =>
                                                                        p !==
                                                                        permission.id
                                                                );
                                                            const added =
                                                                data.permissions.concat(
                                                                    [
                                                                        permission.id,
                                                                    ]
                                                                );

                                                            const onChange =
                                                                () => {
                                                                    setData(
                                                                        "permissions",
                                                                        isExists
                                                                            ? removed
                                                                            : added
                                                                    );
                                                                };

                                                            return (
                                                                <li
                                                                    key={
                                                                        permission.id
                                                                    }
                                                                    className="mb-1"
                                                                >
                                                                    <Checkbox
                                                                        checked={
                                                                            isExists
                                                                        }
                                                                        disabled={
                                                                            data.id ===
                                                                            1
                                                                        }
                                                                        className="mr-2 capitalize"
                                                                        onChange={
                                                                            onChange
                                                                        }
                                                                    >
                                                                        {
                                                                            permission.name
                                                                        }
                                                                    </Checkbox>
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-start">
                                <div>
                                    <Button
                                        htmlType="submit"
                                        loading={processing}
                                        size="large"
                                        type="primary"
                                    >
                                        {__("Save Changes")}
                                    </Button>
                                    <Link href={route("role.index")}>
                                        <Button
                                            htmlType="button"
                                            className="ml-2"
                                            size="large"
                                        >
                                            {__("Cancel")}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

EditPage.layout = (page) => <AuthenticatedLayout children={page} />;
