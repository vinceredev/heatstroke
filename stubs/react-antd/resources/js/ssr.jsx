import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ConfigProvider } from 'antd';
import route from '../../vendor/tightenco/ziggy/dist/index.m';

const appName = import.meta.env.VITE_APP_NAME || 'Heatstroke';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
        setup: ({ App, props }) => {
            global.route = (name, params, absolute) =>
                route(name, params, absolute, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                });

            return (
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#ea4042",
                            colorLink: "#ea4042",
                            borderRadius: 0,
                        },
                    }}
                >
                    <App {...props} />
                </ConfigProvider>
            );
        },
    })
);
