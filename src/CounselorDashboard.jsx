import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser, FaClock, FaEnvelope, FaStickyNote, FaArrowUp } from "react-icons/fa";

// Animations
const float = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(136, 166, 120, 0.3); }
  50% { box-shadow: 0 0 40px rgba(136, 166, 120, 0.6); }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f8f0 0%, #e8f5e8 50%, #d5ecd5 100%);
  color: #597c49ff;
  position: relative;
  overflow-x: hidden;
  font-family: "Quicksand", sans-serif;
`;

const FlowDecoration = styled.div`
  position: fixed;
  z-index: 0;
  opacity: 0.3;
  pointer-events: none;
`;

const FlowTop = styled(FlowDecoration)`
  top: 0;
  right: 10%;
  width: 400px;
  height: 200px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Cpath d='M50 100 Q200 20 350 100 Q200 180 50 100' stroke='%2388a678' stroke-width='3' fill='none'/%3E%3Cpath d='M40 90 Q190 10 340 90 Q190 170 40 90' stroke='%2388a678' stroke-width='2' fill='none'/%3E%3Cpath d='M30 80 Q180 0 330 80 Q180 160 30 80' stroke='%2388a678' stroke-width='2' fill='none'/%3E%3Cpath d='M60 110 Q210 30 360 110 Q210 190 60 110' stroke='%2388a678' stroke-width='2' fill='none'/%3E%3Cpath d='M70 120 Q220 40 370 120 Q220 200 70 120' stroke='%2388a678' stroke-width='1' fill='none'/%3E%3C/svg%3E") no-repeat;
  background-size: contain;
`;

const FlowBottom = styled(FlowDecoration)`
  bottom: 0;
  left: 5%;
  width: 500px;
  height: 150px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 150'%3E%3Cpath d='M50 75 Q250 15 450 75 Q250 135 50 75' stroke='%2388a678' stroke-width='3' fill='none'/%3E%3Cpath d='M40 65 Q240 5 440 65 Q240 125 40 65' stroke='%2388a678' stroke-width='2' fill='none'/%3E%3Cpath d='M30 55 Q230 -5 430 55 Q230 115 30 55' stroke='%2388a678' stroke-width='2' fill='none'/%3E%3Cpath d='M60 85 Q260 25 460 85 Q260 145 60 85' stroke='%2388a678' stroke-width='2' fill='none'/%3E%3C/svg%3E") no-repeat;
  background-size: contain;
`;

const MainContainer = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.7);
  padding: 1.5rem 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(136, 166, 120, 0.1);
`;

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #597c49ff;
  font-family: "Playwrite DE SAS", cursive;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserDetails = styled.div`
  text-align: right;
`;

const UserName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #597c49ff;
  margin-bottom: 0.5rem;
  font-family: "Gowun Dodum", cursive;
`;

const UserRole = styled.div`
  color: #597c49ff;
  font-size: 0.9rem;
`;

const LogoutBtn = styled(motion.button)`
  background: #597c49ff;
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    background: #669751ff;
    transform: translateY(-2px);
  }
`;

const DashboardContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatsCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(136, 166, 120, 0.15);
  backdrop-filter: blur(10px);
`;

const StatsTitle = styled.h2`
  font-size: 1.5rem;
  color: #597c49ff;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: "Gowun Dodum", cursive;
`;

const StatItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background: rgba(89, 124, 73, 0.1);
  border-radius: 15px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const StatLabel = styled.span`
  color: #597c49ff;
  font-weight: bold;
`;

const StatValue = styled.span`
  color: #597c49ff;
  font-size: 1.2rem;
  font-weight: bold;
`;

const BookingSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(136, 166, 120, 0.15);
  backdrop-filter: blur(10px);
`;

const BookingTitle = styled.div`
  font-size: 1.5rem;
  color: #4a5d42;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const TabBtn = styled(motion.button)`
  padding: 0.5rem 1rem;
  background: transparent;
  border: 2px solid #88a678;
  color: #88a678;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active, &:hover {
    background: #88a678;
    color: white;
  }
`;

const BookingList = styled.div`
  padding-right: 10px;
`;

const BookingItem = styled(motion.div)`
  background: rgba(136, 166, 120, 0.05);
  border: 1px solid rgba(136, 166, 120, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(136, 166, 120, 0.2);
  }
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const BookingId = styled.span`
  font-weight: bold;
  color: #88a678;
  font-size: 0.9rem;
`;

const BookingStatus = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  background: ${props => {
    switch(props.status) {
      case 'upcoming': return '#e8f4e8';
      case 'completed': return '#e0f0e0';
      case 'cancelled': return '#ffeaea';
      default: return '#f0f0f0';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'upcoming': return '#4a7c59';
      case 'completed': return '#2d5016';
      case 'cancelled': return '#d63384';
      default: return '#666';
    }
  }};
`;

const BookingDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: 0.8rem;
  color: #88a678;
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

const DetailValue = styled.span`
  color: #4a5d42;
  font-weight: 500;
`;

const BookingActions = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ActionBtn = styled(motion.button)`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  background: ${props => {
    switch(props.variant) {
      case 'primary': return '#88a678';
      case 'secondary': return 'transparent';
      case 'danger': return '#dc3545';
      default: return '#88a678';
    }
  }};
  color: ${props => props.variant === 'secondary' ? '#88a678' : 'white'};
  border: ${props => props.variant === 'secondary' ? '1px solid #88a678' : 'none'};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  }
`;

const QuickActions = styled.div`
  grid-column: 1 / -1;
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(136, 166, 120, 0.15);
  text-align: center;
`;

const QuickActionsTitle = styled.h3`
  color: #4a5d42;
  margin-bottom: 1.5rem;
`;

const QuickActionBtn = styled(motion.button)`
  background: #88a678;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  min-width: 150px;

  &:hover {
    background: #7a9b6a;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(136, 166, 120, 0.3);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: #88a678;
  font-style: italic;
  padding: 2rem;
`;

const ScrollToTopBtn = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: #597c49ff;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(89, 124, 73, 0.3);
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    background: #669751ff;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(89, 124, 73, 0.4);
  }
`;

function CounselorDashboard() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [counselorName, setCounselorName] = useState("Faculty Member");
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Sample booking data
  const [bookings] = useState([
    {
      id: "BK001",
      studentName: "Emma Johnson",
      studentEmail: "emma.j@email.com",
      date: "2025-09-25",
      time: "10:00 AM",
      duration: "60 minutes",
      sessionType: "Academic Guidance",
      status: "upcoming",
      notes: "First-time student, academic planning"
    },
    {
      id: "BK002",
      studentName: "Michael Chen",
      studentEmail: "m.chen@email.com",
      date: "2025-09-25",
      time: "2:00 PM",
      duration: "45 minutes",
      sessionType: "Course Selection",
      status: "upcoming",
      notes: "Help with semester course planning"
    },
    {
      id: "BK003",
      studentName: "Sofia Rodriguez",
      studentEmail: "sofia.r@email.com",
      date: "2025-09-24",
      time: "11:30 AM",
      duration: "60 minutes",
      sessionType: "Academic Support",
      status: "completed",
      notes: "Study strategies and time management"
    },
    {
      id: "BK004",
      studentName: "David Thompson",
      studentEmail: "d.thompson@email.com",
      date: "2025-09-25",
      time: "4:30 PM",
      duration: "60 minutes",
      sessionType: "Career Guidance",
      status: "upcoming",
      notes: "Discussion about career paths and internships"
    },
    {
      id: "BK005",
      studentName: "Lisa Park",
      studentEmail: "lisa.park@email.com",
      date: "2025-09-23",
      time: "1:00 PM",
      duration: "45 minutes",
      sessionType: "Academic Planning",
      status: "cancelled",
      notes: "Student cancelled due to schedule conflict"
    },
    {
      id: "BK006",
      studentName: "James Wilson",
      studentEmail: "j.wilson@email.com",
      date: "2025-09-22",
      time: "3:00 PM",
      duration: "60 minutes",
      sessionType: "Academic Assessment",
      status: "completed",
      notes: "Initial academic needs assessment completed"
    }
  ]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("authUser");
      if (raw) {
        const user = JSON.parse(raw);
        if (user?.name) setCounselorName(user.name);
      }
    } catch {}
  }, []);

  // Simple scroll functionality
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const filteredBookings = currentFilter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === currentFilter);

  const getActionButtons = (booking) => {
    switch(booking.status) {
      case 'upcoming':
        return (
          <>
            <ActionBtn variant="primary" onClick={() => startSession(booking.id)}>
              Start Session
            </ActionBtn>
            <ActionBtn variant="secondary" onClick={() => reschedule(booking.id)}>
              Reschedule
            </ActionBtn>
            <ActionBtn variant="secondary" onClick={() => contactStudent(booking.id)}>
              Contact
            </ActionBtn>
            <ActionBtn variant="danger" onClick={() => cancelSession(booking.id)}>
              Cancel
            </ActionBtn>
          </>
        );
      case 'completed':
        return (
          <>
            <ActionBtn variant="secondary" onClick={() => viewNotes(booking.id)}>
              View Notes
            </ActionBtn>
            <ActionBtn variant="secondary" onClick={() => addFollowUp(booking.id)}>
              Follow Up
            </ActionBtn>
          </>
        );
      case 'cancelled':
        return (
          <>
            <ActionBtn variant="secondary" onClick={() => reschedule(booking.id)}>
              Reschedule
            </ActionBtn>
            <ActionBtn variant="secondary" onClick={() => viewDetails(booking.id)}>
              View Details
            </ActionBtn>
          </>
        );
      default:
        return null;
    }
  };

  // Action functions
  const startSession = (bookingId) => {
    alert(`Starting session for booking ${bookingId}`);
  };

  const reschedule = (bookingId) => {
    alert(`Opening reschedule dialog for booking ${bookingId}`);
  };

  const contactStudent = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    alert(`Contacting ${booking.studentName} at ${booking.studentEmail}`);
  };

  const cancelSession = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this session?')) {
      alert(`Session ${bookingId} cancelled`);
    }
  };

  const viewNotes = (bookingId) => {
    alert(`Opening session notes for booking ${bookingId}`);
  };

  const addFollowUp = (bookingId) => {
    alert(`Adding follow-up for booking ${bookingId}`);
  };

  const viewDetails = (bookingId) => {
    alert(`Viewing details for booking ${bookingId}`);
  };

  const sendReminders = () => {
    alert('Sending session reminders to students');
  };

  const logout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      window.location.href = '/';
    }
  };

  const upcomingCount = bookings.filter(b => b.status === 'upcoming').length;
  const completedThisWeek = bookings.filter(b => b.status === 'completed').length;

  return (
    <Container>
      <FlowTop />
      <FlowBottom />
      
      <MainContainer>
        <Header>
          <Logo>Mind Ease</Logo>
          <UserInfo>
            <UserDetails>
              <UserName>{counselorName}</UserName>
              <UserRole>Academic Counselor</UserRole>
              <LogoutBtn onClick={logout} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Logout
              </LogoutBtn>
            </UserDetails>
          </UserInfo>
        </Header>

        <DashboardContent>
          <StatsCard>
            <StatsTitle>Today's Overview</StatsTitle>
            <StatItem whileHover={{ scale: 1.02 }}>
              <StatLabel>Total Bookings</StatLabel>
              <StatValue>{bookings.length}</StatValue>
            </StatItem>
            <StatItem whileHover={{ scale: 1.02 }}>
              <StatLabel>Upcoming Today</StatLabel>
              <StatValue>{upcomingCount}</StatValue>
            </StatItem>
            <StatItem whileHover={{ scale: 1.02 }}>
              <StatLabel>Completed This Week</StatLabel>
              <StatValue>{completedThisWeek}</StatValue>
            </StatItem>
            <StatItem whileHover={{ scale: 1.02 }}>
              <StatLabel>Pending Reviews</StatLabel>
              <StatValue>3</StatValue>
            </StatItem>
          </StatsCard>

          <BookingSection>
            <BookingTitle>
              <h2>Booking Management</h2>
            </BookingTitle>
            
            <FilterTabs>
              <TabBtn 
                className={currentFilter === 'all' ? 'active' : ''}
                onClick={() => setCurrentFilter('all')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All
              </TabBtn>
              <TabBtn 
                className={currentFilter === 'upcoming' ? 'active' : ''}
                onClick={() => setCurrentFilter('upcoming')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Upcoming
              </TabBtn>
              <TabBtn 
                className={currentFilter === 'completed' ? 'active' : ''}
                onClick={() => setCurrentFilter('completed')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Completed
              </TabBtn>
              <TabBtn 
                className={currentFilter === 'cancelled' ? 'active' : ''}
                onClick={() => setCurrentFilter('cancelled')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancelled
              </TabBtn>
            </FilterTabs>

            <BookingList>
              {filteredBookings.length === 0 ? (
                <EmptyState>No bookings found for the selected filter.</EmptyState>
              ) : (
                filteredBookings.map((booking, index) => (
                  <BookingItem
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <BookingHeader>
                      <BookingId>{booking.id}</BookingId>
                      <BookingStatus status={booking.status}>
                        {booking.status.toUpperCase()}
                      </BookingStatus>
                    </BookingHeader>
                    <BookingDetails>
                      <DetailItem>
                        <DetailLabel><FaUser /> Student Name</DetailLabel>
                        <DetailValue>{booking.studentName}</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel><FaEnvelope /> Email</DetailLabel>
                        <DetailValue>{booking.studentEmail}</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel><FaCalendarAlt /> Date & Time</DetailLabel>
                        <DetailValue>{booking.date} at {booking.time}</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel><FaClock /> Duration</DetailLabel>
                        <DetailValue>{booking.duration}</DetailValue>
                      </DetailItem>
                      <DetailItem>
                        <DetailLabel>Session Type</DetailLabel>
                        <DetailValue>{booking.sessionType}</DetailValue>
                      </DetailItem>
                      <DetailItem style={{ gridColumn: '1 / -1' }}>
                        <DetailLabel><FaStickyNote /> Notes</DetailLabel>
                        <DetailValue>{booking.notes}</DetailValue>
                      </DetailItem>
                    </BookingDetails>
                    <BookingActions>
                      {getActionButtons(booking)}
                    </BookingActions>
                  </BookingItem>
                ))
              )}
            </BookingList>
          </BookingSection>

          <QuickActions>
            <QuickActionsTitle>Quick Actions</QuickActionsTitle>
            <QuickActionBtn onClick={sendReminders} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Send Reminders
            </QuickActionBtn>
          </QuickActions>
        </DashboardContent>

        {/* Simple Scroll to Top Button */}
        {showScrollToTop && (
          <ScrollToTopBtn
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Scroll to Top"
          >
            <FaArrowUp />
          </ScrollToTopBtn>
        )}
      </MainContainer>
    </Container>
  );
}

export default CounselorDashboard;
