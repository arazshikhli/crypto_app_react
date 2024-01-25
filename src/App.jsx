import { Layout, } from 'antd';
import { AppHeader } from './components/Layout/AppHeader';
import { AppSider } from './components/Layout/AppSider';
import { AppContent } from './components/Layout/App.Content';


export default function App() {

  return (
    <Layout >
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  )
}
