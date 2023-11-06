import { useRef, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Button, Form, Input, Modal } from "antd";
import { __ } from "@/Libs/i18n";

export default function DeleteUserForm({ className = "" }) {
    const { auth } = usePage().props;
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    {__("Delete Account")}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <Button
                danger
                onClick={confirmUserDeletion}
                size="large"
                disabled={auth.user.id === 1}
            >
                {__("Delete Account")}
            </Button>

            <Modal
                open={confirmingUserDeletion}
                onOk={deleteUser}
                onCancel={closeModal}
                okText={__("Delete Account")}
                okButtonProps={{
                    disabled: !data.password,
                }}
            >
                <Form onSubmit={deleteUser}>
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>

                    <Form.Item
                        name="password"
                        label={__("Password")}
                        validateStatus={errors.password ? "error" : ""}
                        help={errors.password}
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: __("Please input your password"),
                            },
                        ]}
                    >
                        <Input
                            id="password"
                            size="large"
                            ref={passwordInput}
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder={__("Enter your password")}
                            className="focus:border-primary focus:ring-primary hover:border-primary"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </section>
    );
}
