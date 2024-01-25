import React, { useEffect, useState } from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Tag, Spin, List, Typography, Layout, Card, Statistic } from 'antd';
import { FetchAssets, FetchCrypto } from './api';
import { percentDifference, capitalize } from '../../utils'
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const siderStyle = {
    padding: '1rem'
};
export const AppSider = () => {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    useEffect(() => {
        setLoading(true)
        async function preload() {
            const { result } = await FetchCrypto()
            const assets = await FetchAssets()
            setAssets(assets.map(asset => {
                const coin = result.find(c => c.id === asset.id)
                return {
                    grow: asset.price < coin.price,
                    growPercent: percentDifference(asset.price, coin.price),
                    totalAmmount: asset.amount * coin.price,
                    totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                    ...asset
                }
            }))
            setCrypto(result)
            setLoading(false)
        }
        preload()
    }, [])

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
