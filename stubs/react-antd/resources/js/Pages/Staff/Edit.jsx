import { Head, useForm } from "@inertiajs/react";
import { Button, Form, Input, Select, Switch } from "antd";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { __ } from "@/Libs/i18n";
import UploadAvatar from "@/Components/UploadAvatar";

const { Option } = Select;

export default function EditPage({ staff, roles }) {
    const { patch, data, setData, processing, errors } = useForm({
        name: staff?.name,
        email: staff?.email,
        role: staff?.roles?.[0]?.id,
        avatar: staff?.avatar,
        status: staff?.status,
    });

    const onChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = () => {
        patch(route("staff.update", { id: staff?.id }), {
            preserveScroll: true,
        });
    };

    const initialValues = {
        name: data?.name,
        email: data?.email,
        role: data?.role,
        avatar: data?.avatar,
    };

    return (
        <>
            <Head title="Edit Staff" />

            <Form
                onFinish={submit}
                layout="vertical"
                initialValues={initialValues}
            >
                <div className="min-h-screen">
                    <div className="grid grid-cols-12 w-full">
                        <div className="col-span-8 border-r pt-6 px-4 min-h-screen">
                            <div className="staff-section__header flex items-center justify-between mb-6">
                                <div className="staff-section__header__left text-xl font-bold">
                                    {__("Edit Staff")}
                                </div>
                            </div>

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
                            <Form.Item
                                name="email"
                                label={__("Email Address")}
                                validateStatus={errors.email && "error"}
                                help={errors.email}
                                rules={[
                                    { required: true, message: errors.email },
                                ]}
                            >
                                <Input
                                    size="large"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={onChange}
                                    type="email"
                                    placeholder={__("Email Address")}
                                />
                            </Form.Item>
                            <Form.Item
                                name="role"
                                label={__("Role")}
                                validateStatus={errors.role && "error"}
                                help={errors.role}
                                rules={[
                                    { required: true, message: errors.role },
                                ]}
                                className="capitalize"
                            >
                                <Select
                                    showSearch
                                    onSelect={(values) =>
                                        setData("role", values)
                                    }
                                    placeholder={__("Choose Role")}
                                    filterOption={(input, option) =>
                                        (option?.label ?? "")
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    size="large"
                                >
                                    {roles.map((role) => (
                                        <Option
                                            value={role.id}
                                            key={role.id}
                                            className="capitalize"
                                        >
                                            {role.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="col-span-4 px-4">
                            <UploadAvatar data={data} setData={setData} />

                            <Form.Item
                                name="status"
                                label={__("Active")}
                                validateStatus={errors.status && "error"}
                                help={errors.status}
                            >
                                <Switch
                                    checked={data.status === "active"}
                                    onChange={(checked) =>
                                        setData(
                                            "status",
                                            checked ? "active" : "inactive"
                                        )
                                    }
                                />
                            </Form.Item>

                            <div>
                                <Button
                                    htmlType="submit"
                                    loading={processing}
                                    size="large"
                                    type="primary"
                                >
                                    {__("Save Changes")}
                                </Button>
                                <Link href={route("staff.index")}>
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
                    </div>
                </div>
            </Form>
        </>
    );
}

EditPage.layout = (page) => <AuthenticatedLayout children={page} />;
