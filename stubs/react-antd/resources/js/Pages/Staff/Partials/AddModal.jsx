import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Button, Form, Input, Modal, Select } from "antd";
import { __ } from "@/Libs/i18n";

export default function AddModal({ className }) {
    const { roles } = usePage().props;
    const [openModal, setOpenModal] = useState(false);

    const { post, data, setData, processing, errors } = useForm({
        name: "",
    });

    const onChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = () => {
        post(route("staff.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenModal(false);
            },
        });
    };

    return (
        <div className={className}>
            <Button
                onClick={() => setOpenModal(true)}
                type="primary"
                size="large"
            >
                {__("Invite New Staff")}
            </Button>
            <Modal
                title={__("Invite Staff")}
                open={openModal}
                footer={null}
                onCancel={() => setOpenModal(false)}
                width={572}
            >
                <Form className="mt-6" onFinish={submit} layout="vertical">
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
                            {
                                max: 50,
                                message: __("Name max 50"),
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
                            {
                                type: "email",
                                message: __("Email format must be valid email"),
                            },
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
                        rules={[{ required: true, message: errors.role }]}
                    >
                        <Select
                            showSearch
                            onSelect={(values) => setData("role", values)}
                            placeholder={__("Choose role")}
                            size="large"
                            className="capitalize"
                            options={roles.map((role) => ({
                                value: role.id,
                                label: role.name,
                            }))}
                            filterOption={(input, option) =>
                                (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>

                    <div className="mt-6 flex items-center justify-end">
                        <div>
                            <Button
                                htmlType="button"
                                onClick={() => setOpenModal(false)}
                                size="large"
                            >
                                {__("Cancel")}
                            </Button>
                            <Button
                                htmlType="submit"
                                loading={processing}
                                className="ml-2"
                                type="primary"
                                size="large"
                            >
                                {__("Invite")}
                            </Button>
                        </div>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
