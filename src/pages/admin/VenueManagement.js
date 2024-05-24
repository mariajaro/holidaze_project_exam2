import React, { useState } from 'react';
import CreateVenueForm from '../../components/admin/CreateVenueForm';
import UpdateVenueForm from '../../components/admin/UpdateVenueForm';

const VenueManagement = () => {
    const [activeSection, setActiveSection] = useState('createVenue'); // Set to 'createVenue' initially

    return (
        <div>
            <h1>Venue Management Dashboard</h1>
            <div>
                <button onClick={() => setActiveSection('createVenue')}>
                    Create Venue
                </button>
                <button onClick={() => setActiveSection('updateVenue')}>
                    Update Venue
                </button>
                {/* Consider adding a button for 'viewBookings' if you have a component for it */}
            </div>

            {/* Render forms based on the active section */}
            {activeSection === 'createVenue' && <CreateVenueForm />}
            {activeSection === 'updateVenue' && <UpdateVenueForm />}
        </div>
    );
};

export default VenueManagement;
