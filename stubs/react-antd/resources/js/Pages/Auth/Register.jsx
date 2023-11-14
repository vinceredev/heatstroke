import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Form, Input } from "antd";
import { __ } from "@/Libs/i18n";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = () => {
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <Form
                onFinish={submit}
                className="w-full sm:max-w-md"
                layout="vertical"
            >
                <Form.Item
                    name="name"
                    label={__("Name")}
                    labelCol={{ span: 24 }}
                    validateStatus={errors.name ? "error" : ""}
                    help={errors.name}
                    rules={[
                        {
                            required: true,
                            message: __("Please input your name"),
                        },
                    ]}
                >
                    <Input
                        size="large"
                        onChange={(e) => setData("name", e.target.value)}
                        value={data.name}
                        autoFocus
                        type="name"
                        className="focus:border-primary focus:ring-primary hover:border-primary"
                    />
                </Form.Item>

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

                <div className="flex flex-col items-center justify-end">
                    <Button
                        loading={processing}
                        htmlType="submit"
                        type="primary"
                        size="large"
                        block
                        className="h-auto font-semibold text-base bg-primary hover:bg-primary"
                    >
                        {__("Register")}
                    </Button>

                    <Link
                        href={route("login")}
                        className="underline font-semibold text-sm text-gray-600 hover:text-gray-900 mt-4"
                    >
                        {__("Already registered?")}
                    </Link>
                </div>
            </Form>
        </GuestLayout>
    );
}
