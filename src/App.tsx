import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './ui/Layout'
import { HomePage } from './pages/HomePage'
import { DefectsPage } from './pages/DefectsPage'
import { CasePage } from './pages/CasePage'
import { AnimationsPage } from './pages/AnimationsPage'
import { BuildModePage } from './pages/BuildModePage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/defects" element={<DefectsPage />} />
        <Route path="/case/:caseId" element={<CasePage />} />
        <Route path="/animations" element={<AnimationsPage />} />
        <Route path="/build" element={<BuildModePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
