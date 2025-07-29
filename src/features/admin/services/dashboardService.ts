import API from "../../../services";

export interface DashboardStats {
  total_revenue: number;
  pending_orders: number;
  total_orders: number;
  total_products: number;
}

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const response = await API.get("/orders/merchant/dashboard-stats/");
  return response.data;
};
