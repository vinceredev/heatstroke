import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button, Form, Input, Modal } from "antd";
import { __ } from "@/Libs/i18n";

export default function AddModal({ className }) {
    const [openModal, setOpenModal] = useState(false);

    const { post, data, setData, processing, errors } = useForm({
        name: "",
    });

    const onChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = () => {
        post(route("role.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenModal(false);
            },
        });
    };

    return (
        <div className={className}>
            <Button
                size="large"
                onClick={() => setOpenModal(true)}
                type="primary"
            >
                {__("Add New Role")}
            </Button>
            <Modal
                title={__("Add Role")}
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
                                {__("Save")}
                            </Button>
                        </div>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
