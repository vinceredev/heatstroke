import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Button, Form, Input, Checkbox } from "antd";
import { __ } from "@/Libs/i18n";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = () => {
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

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
                <div className="flex items-center justify-between">
                    <Checkbox
                        onChange={(e) => setData("remember", e.target.checked)}
                        className="font-semibold"
                    >
                        {__("Remember Me")}
                    </Checkbox>
                    {canResetPassword && (
                        <Link
                            href="/forgot-password"
                            className="text-sm hover:underline font-semibold text-primary"
                        >
                            {__("Forgot Password")}
                        </Link>
                    )}
                </div>
                <Button
                    loading={processing}
                    htmlType="submit"
                    type="primary"
                    size="large"
                    block
                    className="h-auto mt-6 font-semibold text-base bg-primary hover:bg-primary"
                >
                    {__("Log In")}
                </Button>
            </Form>
        </GuestLayout>
    );
}
