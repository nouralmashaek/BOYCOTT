import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import Home from '@/pages/Home'
import Scan from '@/pages/Scan'
import Result from "@/pages/Results"
import Products from '@/pages/Products'
import Alternatives from '@/pages/Alternatives'

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/result" element={<Result />} />
            <Route path="/products" element={<Products />} />
            <Route path="/alternatives" element={<Alternatives />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App