import { Collapse, Tag } from 'antd';
import { formatDistance } from 'date-fns';
import { UAParser } from 'ua-parser-js';

const Columns = () => {
    const { Panel } = Collapse;

    const columns = [
        {
            title: `Role Name`,
            key: 'responsive_name',
            responsive: ['xs'],
            render: (_, row) => {
                const parser = row?.properties?.agent ? new UAParser(row?.properties?.agent) : null;

                return (
                    <div className='responsive-table'>
                        <span className='text-sm capitalize text-black/80'>{row?.name}</span>
                        <Collapse ghost>
                            <Panel header='Expand Data' key='1'>
                                <div className='responsive-table__list'>
                                    <div className='responsive-table__list__column'>Created At</div>
                                    <div className='responsive-table__list__value'>
                                        {formatDistance(new Date(), new Date(row?.created_at))}
                                    </div>
                                </div>
                                <div className='responsive-table__list'>
                                    <div className='responsive-table__list__column'>Entity</div>
                                    <div className='responsive-table__list__value'>{row?.subject_type?.replace('App\\Models\\', '')}</div>
                                </div>
                                <div className='responsive-table__list'>
                                    <div className='responsive-table__list__column'>Event</div>
                                    <div className='responsive-table__list__value'>{row?.event}</div>
                                </div>
                                <div className='responsive-table__list'>
                                    <div className='responsive-table__list__column'>Actor</div>
                                    <div className='responsive-table__list__value'>{row?.causer?.email}</div>
                                </div>
                                <div className='responsive-table__list'>
                                    <div className='responsive-table__list__column'>IP</div>
                                    <div className='responsive-table__list__value'>{row?.properties?.ip ?? '-'}</div>
                                </div>
                                <div className='responsive-table__list'>
                                    <div className='responsive-table__list__column'>Browser</div>
                                    <div className='responsive-table__list__value'>
                                        {parser ? JSON.stringify(parser.getBrowser()) : '-'}
                                    </div>
                                </div>
                                <div className='responsive-table__list'>
                                    <div className='responsive-table__list__column'>OS</div>
                                    <div className='responsive-table__list__value'>{parser ? JSON.stringify(parser.getOS()) : '-'}</div>
                                </div>
                                <div className='responsive-table__list'>
                                    <div className='responsive-table__list__column'>Device</div>
                                    <div className='responsive-table__list__value'>
                                        {parser ? JSON.stringify(parser.getDevice()) : '-'}
                                    </div>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                );
            },
        },
        {
            title: `Created At`,
            key: 'created at',
            responsive: ['lg'],
            render: (_, row) => <span>{formatDistance(new Date(), new Date(row?.created_at))}</span>,
        },
        {
            title: `Entity`,
            key: 'subject',
            responsive: ['sm'],
            render: (_, row) => <span>{row?.subject_type?.replace('App\\Models\\', '')}</span>,
        },
        {
            title: 'Event',
            key: 'event',
            responsive: ['xl'],
            render: (_, row) => <Tag>{row?.event}</Tag>,
        },
        {
            title: `Actor`,
            key: 'causer',
            responsive: ['sm'],
            render: (_, row) => <span>{row?.causer?.email}</span>,
        },
        {
            title: `IP`,
            key: 'ip',
            responsive: ['lg'],
            render: (_, row) => <span>{row?.properties?.ip}</span>,
        },
        {
            title: `Browser`,
            key: 'agent',
            responsive: ['lg'],
            render: (_, row) => {
                const parser = row?.properties?.agent ? new UAParser(row?.properties?.agent) : null;
                const browser = parser?.getBrowser()
                return <span>{browser?.name ? `${browser.name} ${browser.version}` : '-'}</span>;
            },
        },
        {
            title: `OS`,
            key: 'os',
            responsive: ['lg'],
            render: (_, row) => {
                const parser = row?.properties?.agent ? new UAParser(row?.properties?.agent) : null;
                const os = parser?.getOS()
                return <span>{os?.name ? `${os.name} ${os.version}` : '-'}</span>;
            },
        },
        {
            title: `Device`,
            key: 'device',
            responsive: ['lg'],
            render: (_, row) => {
                const parser = row?.properties?.agent ? new UAParser(row?.properties?.agent) : null;
                const device = parser?.getDevice();
                return <span>{device?.vendor ? `${device.vendor} ${device.model}` : '-'}</span>;
            },
        },
    ];

    return { columns };
};

export default Columns;
