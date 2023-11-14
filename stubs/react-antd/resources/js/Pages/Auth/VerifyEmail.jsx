import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { __ } from "@/Libs/i18n";
import { Form } from "antd";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-gray-600">
                {__(
                    "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another."
                )}
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {__(
                        "A new verification link has been sent to the email address you provided during registration."
                    )}
                </div>
            )}

            <Form onFinish={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <Button
                        loading={processing}
                        htmlType="submit"
                        type="primary"
                        size="large"
                        block
                        className="h-auto font-semibold text-base bg-primary hover:bg-primary"
                    >
                        {__("Resend Verification Email")}
                    </Button>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {__("Log Out")}
                    </Link>
                </div>
            </Form>
        </GuestLayout>
    );
}
