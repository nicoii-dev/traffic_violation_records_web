import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
//
import ViolationCategories from '../pages/violation-categories/ViolationCategories';
import ViolationsPage from '../pages/violations/Violations';
import CitationRecords from '../pages/citation/CitationRecords';
import PaidCitationRecords from '../pages/citation/PaidCitationRecords';
import UnpaidCitationRecords from '../pages/citation/UnpaidCitationRecords';
import CommunityService from '../pages/community-service/CommunityService';
import CreateCommunityService from '../pages/community-service/CreateCommunityService';
import ViewCommunityService from '../pages/community-service/ViewCommunityService';
import User from '../pages/user/User';
import CreateUser from '../pages/user/CreateUser';
import Invoice from '../pages/invoice/Invoice';
import { getLocalStorageItem } from '../utils/getLocalStorage';
import DashboardLayout from '../layouts/dashboard';
import DashboardApp from '../pages/dashboard/DashboardApp';
import Page404 from '../pages/Page404';
import Login from '../pages/Login';
import ViewUser from '../pages/user/ViewUser';
import CommunityServiceTypes from '../pages/community-service-types/CommunityServiceTypes';
import CreateServiceTypes from '../pages/community-service-types/CreateCommunityServiceTypes';
import ViewCommunityServiceTypes from '../pages/community-service-types/ViewCommunityServiceTypes';
import Payments from '../pages/payment/Payment';
import CreatePayments from '../pages/payment/CreatePayment';
import PaymentsTreasurer from '../pages/payment/PaymentTreasurer';
import TreasurerReport from '../pages/reports/treasurer/TreasurerReport';
import AdminReports from '../pages/reports/admin/AdminReports';
import ForgotPassword from '../pages/forgot-password/ForgotPassword';
import ResetPassword from '../pages/forgot-password/ResetPassword';
import VehicleMake from '../pages/vehicle-make/VehicleMake';
import VehicleClass from '../pages/vehicle-class/VehicleClass';
import CreateCitation from '../pages/citation/CreateCitationRecords';

// ----------------------------------------------------------------------

export default function UserRoute() {
  const location = useLocation();
  const userData = getLocalStorageItem('userData');
  // console.log(userData);
  
  if (userData?.role === 'admin' && userData?.role !== undefined) {
    return (
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/" element={<DashboardApp />} />
          <Route path="/dashboard" element={<DashboardApp />} />
          <Route path="citation" element={<CreateCitation />} />
          <Route path="violations-records" element={<CitationRecords />} />
          <Route path="violations-records/paid" element={<PaidCitationRecords />} />
          <Route path="violations-records/unpaid" element={<UnpaidCitationRecords />} />
          <Route path="invoices" element={<Invoice />} />
          <Route path="payments" element={<Payments />} />
          <Route path="payments/create" element={<CreatePayments />} />
          <Route path="community-services" element={<CommunityService />} />
          <Route path="community-services/create" element={<CreateCommunityService />} />
          <Route path="community-services/view/:id" element={<ViewCommunityService />} />
          <Route path="users" element={<User />} />
          <Route path="user/create" element={<CreateUser />} />
          <Route path="user/view" element={<ViewUser />} />
          <Route path="settings/violation-categories" element={<ViolationCategories />} />
          <Route path="settings/vehicle-make" element={<VehicleMake />} />
          <Route path="settings/vehicle-class" element={<VehicleClass />} />
          <Route path="settings/violations-list" element={<ViolationsPage />} />
          <Route path="settings/community-services-types" element={<CommunityServiceTypes />} />
          <Route path="settings/community-services-types/create" element={<CreateServiceTypes />} />
          <Route path="settings/community-services-types/view" element={<ViewCommunityServiceTypes />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="*" element={<Navigate to="/" state={{ from: location }} replace />} />
        </Route>
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    );
  }

  if (userData?.role !== 'admin' && userData?.role !== undefined) {
    return (
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* <Route path="/" element={<DashboardApp />} /> */}
          <Route path="/" element={<Invoice />} />
          <Route path="invoices" element={<Invoice />} />
          <Route path="payments/:id" element={<PaymentsTreasurer />} />
          <Route path="payments/:id/create" element={<CreatePayments />} />
          <Route path="reports/:id" element={<TreasurerReport />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="signin" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="resetpass" element={<ResetPassword />} />
      {/* <Route path="*" element={<Navigate to="/signin" state={{ from: location }} replace />} /> */}
    </Routes>
  );
}
