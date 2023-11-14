import { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Button, Form, Input } from "antd";
import GuestLayout from "@/Layouts/GuestLayout";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("password.store"));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <Form onFinish={submit}>
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
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={onChange}
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
                            message: __("Please confirm your password"),
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

                <div className="flex items-center justify-end mt-4">
                    <Button
                        loading={processing}
                        htmlType="submit"
                        type="primary"
                        size="large"
                        block
                        className="h-auto font-semibold text-base bg-primary hover:bg-primary"
                    >
                        {__("Reset Password")}
                    </Button>
                </div>
            </Form>
        </GuestLayout>
    );
}
