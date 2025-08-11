import { useState, useEffect, useRef } from "react";
import { Spin, Button, Input, Card, Alert, Typography, Space } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import UserService from "src/services/ProfileServices";

const { Title, Text } = Typography;
const UserProfile = () => {
  // State management
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [updating, setUpdating] = useState(false);

  // Refs for cleanup
  const abortControllerRef = useRef(null);
  const updateAbortControllerRef = useRef(null);

  /**
   * Fetch user data from API
   */
  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create abort controller for request cancellation
      abortControllerRef.current = new AbortController();

      // Fetch user data (using ID = 1 as specified)
      const userData = await UserService.getUserById(1);
      console.log(abortControllerRef);
      // Check if component is still mounted
      if (!abortControllerRef.current?.signal.aborted) {
        setUser(userData);
        setEditName(userData.name);
      }
    } catch (err) {
      // Only set error if request wasn't cancelled
      if (!abortControllerRef.current?.signal.aborted) {
        setError(err.message || "Failed to fetch user data");
        console.error("Error fetching user data:", err);
      }
    } finally {
      // Only update loading if component is still mounted
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  };

  /**
   * Handle name update with optimistic updates
   */
  const handleUpdateName = async () => {
    if (!editName.trim() || editName === user.name) {
      setIsEditing(false);
      return;
    }

    const previousName = user.name;
    try {
      setUpdating(true);
      setUser((prev) => ({ ...prev, name: editName }));
      setIsEditing(false);

      updateAbortControllerRef.current = new AbortController();

      // Send update request to API
      await UserService.updateProfile(user.id, {
        ...user,
        name: editName,
      });

      console.log("Profile updated successfully");
    } catch (err) {
      if (!updateAbortControllerRef.current?.signal.aborted) {
        setUser((prev) => ({ ...prev, name: previousName }));
        setEditName(previousName);
        setError(err.message || "Failed to update profile");
        console.error("Error updating profile:", err);
      }
    } finally {
      if (!updateAbortControllerRef.current?.signal.aborted) {
        setUpdating(false);
      }
    }
  };

  /**
   * Cancel edit
   */
  const handleCancelEdit = () => {
    setEditName(user.name);
    setIsEditing(false);
  };

  /**
   * Retry fetching data
   */
  const handleRetry = () => {
    fetchUserData();
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (updateAbortControllerRef.current) {
        updateAbortControllerRef.current.abort();
      }
    };
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <Card>
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Spin size="large" />
            <div style={{ marginTop: "16px" }}>
              <Text>Loading user profile...</Text>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <Card>
          <div style={{ textAlign: "center", padding: "40px" }}>
            <Alert
              message="Error Loading Profile"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: "20px" }}
            />
            <Button type="primary" onClick={handleRetry}>
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Card>
        <Title level={2}>User Profile</Title>

        {/* Error message for update failures */}
        {error && user && (
          <Alert
            message={error}
            type="error"
            closable
            onClose={() => setError(null)}
            style={{ marginBottom: "20px" }}
          />
        )}

        {/* Profile Information */}
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Name Section */}
          <div>
            <Text strong>Name:</Text>
            {isEditing ? (
              <div style={{ marginTop: "8px" }}>
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  disabled={updating}
                  style={{ marginBottom: "10px" }}
                />
                <Space>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleUpdateName}
                    loading={updating}
                    disabled={!editName.trim()}
                  >
                    Save
                  </Button>
                  <Button
                    icon={<CloseOutlined />}
                    onClick={handleCancelEdit}
                    disabled={updating}
                  >
                    Cancel
                  </Button>
                </Space>
              </div>
            ) : (
              <div style={{ marginTop: "8px" }}>
                <Space>
                  <Text style={{ fontSize: "16px" }}>{user.name}</Text>
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => setIsEditing(true)}
                    size="small"
                  >
                    Edit
                  </Button>
                </Space>
              </div>
            )}
          </div>

          {/* Other Profile Fields */}
          <div>
            <Text strong>Email:</Text>
            <div style={{ marginTop: "4px" }}>
              <Text>{user.email}</Text>
            </div>
          </div>

          <div>
            <Text strong>Username:</Text>
            <div style={{ marginTop: "4px" }}>
              <Text>{user.username}</Text>
            </div>
          </div>

          <div>
            <Text strong>Phone:</Text>
            <div style={{ marginTop: "4px" }}>
              <Text>{user.phone}</Text>
            </div>
          </div>

          <div>
            <Text strong>Website:</Text>
            <div style={{ marginTop: "4px" }}>
              <Text>{user.website}</Text>
            </div>
          </div>

          {/* Address Information */}
          {user.address && (
            <div>
              <Text strong>Address:</Text>
              <div style={{ marginTop: "4px" }}>
                <Text>
                  {user.address.street}, {user.address.suite}
                  <br />
                  {user.address.city}, {user.address.zipcode}
                </Text>
              </div>
            </div>
          )}

          {/* Company Information */}
          {user.company && (
            <div>
              <Text strong>Company:</Text>
              <div style={{ marginTop: "4px" }}>
                <Text>{user.company.name}</Text>
              </div>
            </div>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default UserProfile;
