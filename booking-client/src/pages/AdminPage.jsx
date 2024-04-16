import Tabs from "antd/es/tabs";
import Bookings from "../components/Bookings";
import Rooms from "../components/Rooms";
import Users from "../components/Users";

import AddRoom from "../components/AddRoom";

const { TabPane } = Tabs;

function AdminPage() {
  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h2 className="text-center">Admin Panel</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Rooms" key="3">
          <AddRoom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminPage;
