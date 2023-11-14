import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Form, Input } from "antd";
import { __ } from "@/Libs/i18n";

export default function SetPassword({ user }) {
    const { setData, patch, processing, errors } = useForm({
        token: user.invitation_token,
        password: "",
        password_confirmation: "",
    });

    const onChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const onFinish = () => {
        patch(route("invitation.update", {token: user.invitation_token }), {
            onSuccess: () => {},
        });
    };

    return (
        <GuestLayout>
            <Head title="Set Password" />

            <div className="w-full flex-col">
                <div className="mb-4">
                    <div className="md:text-lg text-gray-500">
                        {__("Enter your password to verify your email")}
                    </div>
                </div>

                <Form
                    className="auth-form w-full sm:max-w-md"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="password"
                        label="Password"
                        labelCol={{ span: 24 }}
                        validateStatus={errors.password ? "error" : ""}
                        help={errors.password}
                        rules={[
                            {
                                required: true,
                                message: "Please input your new password",
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            id="password"
                            name="password"
                            type="password"
                            onChange={onChange}
                            placeholder="Enter your password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password_confirmation"
                        label="Confirm Password"
                        labelCol={{ span: 24 }}
                        validateStatus={
                            errors.password_confirmation ? "error" : ""
                        }
                        help={errors.password_confirmation}
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your new password",
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            onChange={onChange}
                            placeholder="Enter your password confirmation"
                        />
                    </Form.Item>
                    <Button
                        loading={processing}
                        htmlType="submit"
                        type="primary"
                        block
                        size="large"
                        className="mt-2 font-semibold text-base bg-primary hover:bg-primary"
                    >
                        Set Password
                    </Button>
                </Form>
            </div>
        </GuestLayout>
    );
}
