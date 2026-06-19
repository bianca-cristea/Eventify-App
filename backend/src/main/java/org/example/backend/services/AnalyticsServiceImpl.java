package org.example.backend.services;

import org.example.backend.payload.AnalyticsResponse;
import org.example.backend.repositories.BookingRepository;
import org.example.backend.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsServiceImpl implements AnalyticsService{

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    @Override
    public AnalyticsResponse getAnalyticsData() {
        AnalyticsResponse response = new AnalyticsResponse();

        long eventCount = eventRepository.count();
        long totalBookings = bookingRepository.count();
        Double totalRevenue = bookingRepository.getTotalRevenue();

        response.setEventCount(String.valueOf(eventCount));
        response.setTotalBookings(String.valueOf(totalBookings));
        response.setTotalRevenue(String.valueOf(totalRevenue != null ? totalRevenue : 0));


        return  response;
    }
}
