import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import List from "./pages/Sales/List";
import SalesForm from './pages/Sales/Form/SalesForm';
import CommissionsList from './pages/Commissions/List/CommissionsList';

export function AppRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/vendas">
          <Route path="/vendas" element={<List />} />
          <Route path="/vendas/adicionar" element={<SalesForm />} />
          <Route path="/vendas/:id/atualizar" element={<SalesForm />} />
        </Route>
        <Route path="/comissoes">
          <Route path="/comissoes" element={<CommissionsList />} />
        </Route>
      </Routes>
    )
  }