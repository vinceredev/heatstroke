import { useRef } from "react";
import { useForm } from "@inertiajs/react";
import { Button, Form, Input } from "antd";
import { __ } from "@/Libs/i18n";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const onChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const updatePassword = () => {
        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    {__("Update Password")}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {__("Ensure your account is using a long, random password to stay secure.")}"
                </p>
            </header>

            <Form onFinish={updatePassword} className="mt-6 space-y-6">
                <Form.Item
                    name="current_password"
                    label={__("Current Password")}
                    validateStatus={errors.current_password ? "error" : ""}
                    help={errors.current_password}
                    labelCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: __("Please input your current password"),
                        },
                    ]}
                >
                    <Input
                        id="current_password"
                        size="large"
                        ref={currentPasswordInput}
                        name="current_password"
                        type="password"
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        placeholder={__("Enter your password")}
                        className="focus:border-primary focus:ring-primary hover:border-primary"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    label={__("Password")}
                    validateStatus={errors.password ? "error" : ""}
                    help={errors.password}
                    labelCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: __("Please input your new password"),
                        },
                    ]}
                >
                    <Input
                        id="password"
                        size="large"
                        ref={passwordInput}
                        value={data.password}
                        name="password"
                        type="password"
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder={__("Enter your password")}
                        className="focus:border-primary focus:ring-primary hover:border-primary"
                    />
                </Form.Item>

                <Form.Item
                    name="password_confirmation"
                    label={__("Confirm Password")}
                    validateStatus={errors.password_confirmation ? "error" : ""}
                    help={errors.password_confirmation}
                    labelCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: __("Please confirm your new password"),
                        },
                    ]}
                >
                    <Input
                        id="password_confirmation"
                        size="large"
                        name="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={onChange}
                        placeholder={__("Confirm Password")}
                        className="focus:border-primary focus:ring-primary hover:border-primary"
                    />
                </Form.Item>

                <div className="flex items-center gap-4">
                    <Button
                        loading={processing}
                        htmlType="submit"
                        type="primary"
                        size="large"
                        className="h-auto text-base bg-primary hover:bg-primary"
                    >
                        {__("Update Password")}
                    </Button>
                </div>
            </Form>
        </section>
    );
}
