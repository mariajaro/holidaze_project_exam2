import React, { useState } from 'react';
import CreateVenueForm from '../../components/admin/CreateVenueForm';
import UpdateVenueForm from '../../components/admin/UpdateVenueForm';


const VenueManagement = () => {
    const [activeSection, setActiveSection] = useState('viewBookings');

    return (
        <div>
            <h1>Venue Management Dashboard</h1>
            <div>
                <button onClick={() => setActiveSection('createVenue')}>Create Venue</button>
                <button onClick={() => setActiveSection('updateVenue')}>Update Venue</button>
            </div>

            {activeSection === 'createVenue' && <CreateVenueForm venueId="yourVenueId" />} 
            {activeSection === 'updateVenue' && <UpdateVenueForm venueId="yourVenueId" />} 
        </div>
    );
};

export default VenueManagement;
