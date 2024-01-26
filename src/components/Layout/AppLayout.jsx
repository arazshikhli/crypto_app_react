import { useContext } from 'react'
import { CryptoContext } from '../../context/crypto-context'
import { Layout, Spin, Flex, Alert } from 'antd';
import { AppContent } from '../Layout/App.Content'
import { AppHeader } from '../Layout/AppHeader'
import { AppSider } from '../Layout/AppSider';
import './styles.css'
export const AppLayout = () => {
    const { loading } = useContext(CryptoContext)
    if (loading) {
        return <Flex gap="small" vertical>
            <Flex gap="small">
                <Spin tip="Loading" size="small">
                    <div className="content" />
                </Spin>
                <Spin tip="Loading">
                    <div className="content" />
                </Spin>
                <Spin tip="Loading" size="large">
                    <div className="content" />
                </Spin>
            </Flex>
            <Spin tip="Loading...">
                <Alert
                    message="Alert message title"
                    description="Further details about the context of this alert."
                    type="info"
                />
            </Spin>
        </Flex>
    }
    return (<Layout >
        <AppHeader />
        <Layout>
            <AppSider />
            <AppContent />
        </Layout>
    </Layout>)
}