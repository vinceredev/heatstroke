import './bootstrap';
import '../css/app.less';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { App as AntdApp, ConfigProvider } from "antd";

const appName = import.meta.env.VITE_APP_NAME || 'Heatstroke';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#ea4042",
                        colorLink: "#ea4042",
                        borderRadius: 8,
                        colorBgBase: '#fcfcfc',
                        colorTextDisabled: "#cdcecf",
                        colorBgContainerDisabled: "#f0f0f0",
                    },
                }}
            >
                <AntdApp>
                    <App {...props} />
                </AntdApp>
            </ConfigProvider>
        );
    },
    progress: {
        color: "#ea4042",
    },
});
