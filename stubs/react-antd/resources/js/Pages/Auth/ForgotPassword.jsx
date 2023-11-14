import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { __ } from "@/Libs/i18n";
import { Button, Form, Input } from "antd";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = () => {
        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                {__(
                    "Please enter your email address and we will email you a password reset link that will allow you to choose a new one."
                )}
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <Form
                onFinish={submit}
                className="w-full sm:max-w-md"
                layout="vertical"
            >
                <Form.Item
                    name="email"
                    label={__("Email")}
                    labelCol={{ span: 24 }}
                    validateStatus={errors.email ? "error" : ""}
                    help={errors.email}
                    rules={[
                        {
                            required: true,
                            message: __("Please input your email address"),
                        },
                    ]}
                >
                    <Input
                        size="large"
                        onChange={(e) => setData("email", e.target.value)}
                        value={data.email}
                        autoComplete="username"
                        autoFocus
                        type="email"
                        className="focus:border-primary focus:ring-primary hover:border-primary"
                    />
                </Form.Item>

                <Button
                    loading={processing}
                    htmlType="submit"
                    type="primary"
                    size="large"
                    block
                    className="h-auto font-semibold text-base bg-primary hover:bg-primary"
                >
                    {__("Get Email Reset Link")}
                </Button>
            </Form>
        </GuestLayout>
    );
}
