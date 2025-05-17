import React, { useEffect, useState } from "react";
import { TextField, Button, Paper, Grid, Typography } from "@mui/material";
import { Business, Person, Phone, Email, Home, Save } from "@mui/icons-material";
import { businessService } from "../../services/business.service";
import { useAuth } from "../../services/auth.provider";
import { Business as BusinessModel } from "../../models/business.model";

const BusinessList: React.FC = () => {
    const { user } = useAuth();
    const [businesses, setBusinesses] = useState<BusinessModel[]>([]);
    const [updatedBusinesses, setUpdatedBusinesses] = useState<{ [key: string]: Partial<BusinessModel> }>({});
    const [newBusiness, setNewBusiness] = useState<Partial<BusinessModel>>({});

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const result = await businessService.getAllBusiness(user?.token);
                setBusinesses(result);
            } catch (error) {
                console.error("Error fetching businesses:", error);
            }
        };
        fetchBusinesses();
    }, [user?.token]);

    const handleInputChange = (id: string, field: keyof BusinessModel, value: string) => {
        if (id === "new") {
            setNewBusiness((prev) => ({
                ...prev,
                [field]: value,
            }));
        } else {
            setUpdatedBusinesses((prev) => ({
                ...prev,
                [id]: {
                    ...prev[id],
                    [field]: value,
                },
            }));
        }
    };

    const handleSave = async (id: string) => {
        try {
            if (id === "new") {
                const createdBusiness = await businessService.createBusiness(newBusiness as BusinessModel, user?.token);
                setBusinesses([createdBusiness]);
                setNewBusiness({});
            } else {
                const updatedBusiness = updatedBusinesses[id];
                if (updatedBusiness) {
                    const updatedData = await businessService.updateBusiness(id, updatedBusiness, user?.token);
                    setBusinesses(updatedData);
                }
            }
        } catch (error) {
            console.error("Error saving business:", error);
        }
    };

    return (
        <Paper sx={{ padding: 3, maxWidth: 900, margin: "20px auto" }}>
            <Typography variant="h5" gutterBottom>
                ניהול פרטי העסק
            </Typography>

            {businesses.length === 0 ? (
                <Paper sx={{ padding: 3, marginBottom: 2 }}>
                    <Typography variant="h6">הוספת עסק חדש</Typography>
                    <Grid container spacing={2}>
                        {["name", "admin", "phone", "email", "address"].map((field) => (
                            <Grid item xs={12} sm={6} key={field}>
                                <TextField
                                    fullWidth
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    value={newBusiness[field as keyof BusinessModel] || ""}
                                    onChange={(e) =>
                                        handleInputChange("new", field as keyof BusinessModel, e.target.value)
                                    }
                                />
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleSave("new")}
                                startIcon={<Save />}
                            >
                                שמירה
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            ) : (
                businesses.map((business) => (
                    <Paper sx={{ marginBottom: 2, padding: 2 }} key={business._id}>
                        <Grid container spacing={2} alignItems="center">
                            {[
                                { field: "name", icon: <Business /> },
                                { field: "admin", icon: <Person /> },
                                { field: "phone", icon: <Phone /> },
                                { field: "email", icon: <Email /> },
                                { field: "address", icon: <Home /> },
                            ].map(({ field, icon }) => (
                                <Grid item xs={12} sm={6} key={field}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        {icon}
                                        <TextField
                                            fullWidth
                                            value={
                                                updatedBusinesses[business._id]?.[field as keyof BusinessModel] ||
                                                business[field as keyof BusinessModel]
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    business._id,
                                                    field as keyof BusinessModel,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </Grid>
                            ))}
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleSave(business._id)}
                                    startIcon={<Save />}
                                >
                                    שמירת השינויים
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                ))
            )}
        </Paper>
    );
};

export default BusinessList;
