import React, { useEffect, useState } from 'react';
import AddShowtime from "../components/AddShowtime"
import { getAllShowtimes, getAllRooms, getAllMovie,getAllProfiles } from '../services/API';
import { Table } from 'react-bootstrap'; 
import SidebarComponent from '../components/SideBar';
import NavbarComponent from '../components/NavBar';

const User = () => {
    const [profiles, setProfiles] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getAllProfiles()
            .then(response => {
                setProfiles(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    // const loadShowtimes = () => {
    //     setIsLoading(true);
    //     getAllShowtimes()
    //         .then(response => {
    //             setShowtimes(response.data);
    //             setIsLoading(false);
    //         })
    //         .catch(error => {
    //             setError(error.message);
    //             setIsLoading(false);
    //         });
    // };


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="d-flex flex-column h-100">
            <SidebarComponent />
            <NavbarComponent />
            <div style={{ marginTop: '70px', marginLeft: '280px' }}>

                <div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px', paddingBottom: '20px' }}>
                        {/* <AddShowtime onAdd={loadShowtimes} /> */}
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profiles.map((profile, index) => (
                                <tr key={profile.id}>
                                    <td>{profile.email}</td>
                                    <td>{profile.firstName} {profile.lastName}</td>
                                    <td>{profile.phone}</td>
                                    <td>{profile.gender}</td>
                                    <td>{profile.role}</td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                        a
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default User;
