import React, { useEffect, useState } from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Tag, Spin, List, Typography, Layout, Card, Statistic } from 'antd';

import { percentDifference, capitalize } from '../../utils'


const siderStyle = {
    padding: '1rem'
};
export const AppSider = () => {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    if (loading) {
        return <Spin fullscreen size='large' />
    }
    return (
        <Layout.Sider style={siderStyle}>
            {
                assets.map((asset) => (<Card
                    style={{
                        marginBottom: '1rem',
                        width: 300,

                    }}
                    key={asset.id}
                >
                    <Statistic
                        title={capitalize(asset.id)}
                        value={asset.totalAmmount}
                        precision={2}
                        valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
                        prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        suffix='$'
                    />
                    <List
                        header={<div>Header</div>}
                        footer={<div>Footer</div>}
                        bordered
                        dataSource={[
                            { title: 'Total Profit', value: asset.totalProfit, withTag: true },
                            { title: 'Asset Amount', value: asset.amount, isPlain: true },
                            // { title: 'Difference', value: asset.growPercent }
                        ]}
                        renderItem={(item) => (
                            <List.Item >
                                <span>{item.title}</span>
                                <span>
                                    {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                                    {item.isPlain && item.value.toFixed(2)}
                                    {!item.isPlain && <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2)} $</Typography.Text>}
                                </span>
                            </List.Item>
                        )}
                        size='small'
                    />
                </Card>))
            }


        </Layout.Sider>
    )
}
