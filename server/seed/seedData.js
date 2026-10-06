import Department from '../models/Department.js';
import Staff from '../models/Staff.js';
import Category from '../models/Category.js';
import Location from '../models/Location.js';
import Problem from '../models/Problem.js';
import Feedback from '../models/Feedback.js';
import Notification from '../models/Notification.js';

export const seedDatabase = async () => {
  try {
    const deptCount = await Department.countDocuments();
    if (deptCount === 0) {
      console.log('🌱 Seeding initial MongoDB collections...');

      // 1. Departments
      await Department.insertMany([
        {
          dept_id: "dept_it",
          name: "IT Department",
          code: "IT",
          description: "Campus network, servers, Wi-Fi, lab PCs, smart classrooms, and software systems.",
          head: "Dr. Suresh Sharma",
          contact_email: "it-support@college.edu",
          phone: "+91 98765 43210",
          active_problems_count: 8,
          resolved_problems_count: 42,
          staff_count: 5,
          status: "ACTIVE"
        },
        {
          dept_id: "dept_elec",
          name: "Electrical Department",
          code: "ELEC",
          description: "Power supply, transformers, generators, AC units, lights, and wiring.",
          head: "Eng. Rajesh Verma",
          contact_email: "electrical@college.edu",
          phone: "+91 98765 43211",
          active_problems_count: 5,
          resolved_problems_count: 38,
          staff_count: 4,
          status: "ACTIVE"
        },
        {
          dept_id: "dept_plumb",
          name: "Plumbing & Sanitation",
          code: "PLUMB",
          description: "Water supply, restrooms, drainage, water purifiers, and sewage treatment.",
          head: "Mahesh Chandra",
          contact_email: "plumbing@college.edu",
          phone: "+91 98765 43212",
          active_problems_count: 4,
          resolved_problems_count: 29,
          staff_count: 3,
          status: "ACTIVE"
        },
        {
          dept_id: "dept_maint",
          name: "General Maintenance",
          code: "MAINT",
          description: "Furniture, doors, locks, painting, structural repairs, and carpentry.",
          head: "Vikram Singh",
          contact_email: "maintenance@college.edu",
          phone: "+91 98765 43213",
          active_problems_count: 6,
          resolved_problems_count: 51,
          staff_count: 6,
          status: "ACTIVE"
        },
        {
          dept_id: "dept_clean",
          name: "Housekeeping & Cleaning",
          code: "CLEAN",
          description: "Campus hygiene, waste disposal, classroom cleaning, and groundskeeping.",
          head: "Sunita Rani",
          contact_email: "cleaning@college.edu",
          phone: "+91 98765 43214",
          active_problems_count: 3,
          resolved_problems_count: 64,
          staff_count: 8,
          status: "ACTIVE"
        },
        {
          dept_id: "dept_hostel",
          name: "Hostel Administration",
          code: "HOSTEL",
          description: "Hostel rooms, mess facilities, hot water systems, and resident welfare.",
          head: "Warden K. P. Nair",
          contact_email: "hostel-warden@college.edu",
          phone: "+91 98765 43215",
          active_problems_count: 7,
          resolved_problems_count: 35,
          staff_count: 4,
          status: "ACTIVE"
        },
        {
          dept_id: "dept_lib",
          name: "Library Services",
          code: "LIB",
          description: "Central library facilities, quiet zones, digital catalog terminals, AC.",
          head: "Dr. Meena Iyer",
          contact_email: "library@college.edu",
          phone: "+91 98765 43216",
          active_problems_count: 2,
          resolved_problems_count: 18,
          staff_count: 3,
          status: "ACTIVE"
        },
        {
          dept_id: "dept_sec",
          name: "Campus Security",
          code: "SEC",
          description: "CCTV surveillance, entry gates, parking management, and emergency response.",
          head: "Capt. A. K. Rao (Retd.)",
          contact_email: "security@college.edu",
          phone: "+91 98765 43217",
          active_problems_count: 1,
          resolved_problems_count: 22,
          staff_count: 10,
          status: "ACTIVE"
        }
      ]);

      // 2. Staff
      await Staff.insertMany([
        {
          staff_id_code: "STF-IT-01",
          name: "Rahul Kumar",
          email: "rahul.k@college.edu",
          phone: "+91 98111 22334",
          department_id: "dept_it",
          department_name: "IT Department",
          role: "Senior Network Engineer",
          active_problems: 3,
          resolved_problems: 24,
          status: "ACTIVE"
        },
        {
          staff_id_code: "STF-IT-02",
          name: "Priya Sundaram",
          email: "priya.s@college.edu",
          phone: "+91 98111 22335",
          department_id: "dept_it",
          department_name: "IT Department",
          role: "Systems Administrator",
          active_problems: 2,
          resolved_problems: 18,
          status: "ACTIVE"
        },
        {
          staff_id_code: "STF-ELEC-01",
          name: "Amit Patel",
          email: "amit.p@college.edu",
          phone: "+91 98111 22336",
          department_id: "dept_elec",
          department_name: "Electrical Department",
          role: "Chief Electrician",
          active_problems: 4,
          resolved_problems: 31,
          status: "ACTIVE"
        },
        {
          staff_id_code: "STF-PLUMB-01",
          name: "Ramesh Sharma",
          email: "ramesh.s@college.edu",
          phone: "+91 98111 22337",
          department_id: "dept_plumb",
          department_name: "Plumbing & Sanitation",
          role: "Master Plumber",
          active_problems: 2,
          resolved_problems: 27,
          status: "ACTIVE"
        },
        {
          staff_id_code: "STF-MAINT-01",
          name: "Deepak Yadav",
          email: "deepak.y@college.edu",
          phone: "+91 98111 22338",
          department_id: "dept_maint",
          department_name: "General Maintenance",
          role: "Carpentry Specialist",
          active_problems: 3,
          resolved_problems: 40,
          status: "ACTIVE"
        }
      ]);

      // 3. Categories
      await Category.insertMany([
        { cat_id: "cat_it", name: "IT & Network", code: "IT", description: "Wi-Fi, routers, computers, projector systems, server connectivity", icon: "Wifi", active_count: 8 },
        { cat_id: "cat_elec", name: "Electrical", code: "ELEC", description: "Power failure, switches, fans, air conditioning, lab power points", icon: "Zap", active_count: 6 },
        { cat_id: "cat_plumb", name: "Plumbing", code: "PLUMB", description: "Water leakages, tap repair, flush malfunction, RO water cooler issue", icon: "Droplets", active_count: 4 },
        { cat_id: "cat_clean", name: "Cleaning", code: "CLEAN", description: "Classroom cleaning, trash overflow, restroom sanitation, spillages", icon: "Sparkles", active_count: 3 },
        { cat_id: "cat_infra", name: "Infrastructure", code: "INFRA", description: "Broken desks, door locks, window panes, ceiling plaster, elevator", icon: "Building", active_count: 5 },
        { cat_id: "cat_hostel", name: "Hostel Facilities", code: "HOSTEL", description: "Room amenities, mess quality, geyser malfunction, laundry area", icon: "Home", active_count: 4 },
        { cat_id: "cat_lib", name: "Library", code: "LIB", description: "Book scanning terminals, quiet study room AC, electrical sockets", icon: "BookOpen", active_count: 2 },
        { cat_id: "cat_lab", name: "Laboratory", code: "LAB", description: "Fume hood, gas supply, precision power supply, safety shower", icon: "FlaskConical", active_count: 2 },
        { cat_id: "cat_sec", name: "Security & Safety", code: "SEC", description: "CCTV blindspot, gate barrier malfunction, emergency lights", icon: "ShieldAlert", active_count: 1 },
        { cat_id: "cat_trans", name: "Transport", code: "TRANS", description: "Shuttle bus schedule, bus stop lighting, parking slot issues", icon: "Bus", active_count: 1 },
        { cat_id: "cat_other", name: "Other", code: "OTHER", description: "General queries and miscellaneous campus issues", icon: "HelpCircle", active_count: 0 }
      ]);

      // 4. Locations
      await Location.insertMany([
        { loc_id: "loc_block_a", name: "Block A — Administrative Wing", building: "Block A", floor: "Ground to 4th Floor", rooms: "A-101 to A-412", active_issues: 3, status: "ACTIVE" },
        { loc_id: "loc_block_b", name: "Block B — Science & Humanities", building: "Block B", floor: "Ground to 5th Floor", rooms: "B-101 to B-520", active_issues: 4, status: "ACTIVE" },
        { loc_id: "loc_block_c", name: "Block C — Engineering & IT Labs", building: "Block C", floor: "Ground to 6th Floor", rooms: "C-101 to C-630", active_issues: 7, status: "ACTIVE" },
        { loc_id: "loc_library", name: "Central Library Building", building: "Library", floor: "3 Floors", rooms: "Reading Halls 1-4, Digital Section", active_issues: 2, status: "ACTIVE" },
        { loc_id: "loc_main_gate", name: "Main Gate & Security Complex", building: "Main Security Gate", floor: "Ground", rooms: "Gate 1, Visitor Cabin, Parking A", active_issues: 1, status: "ACTIVE" },
        { loc_id: "loc_hostel_a", name: "Hostel Block A (Boys)", building: "Hostel A", floor: "4 Floors", rooms: "Rooms 101 to 440", active_issues: 5, status: "ACTIVE" },
        { loc_id: "loc_hostel_b", name: "Hostel Block B (Girls)", building: "Hostel B", floor: "4 Floors", rooms: "Rooms 101 to 440", active_issues: 4, status: "ACTIVE" },
        { loc_id: "loc_lab_block", name: "Advanced Research & Lab Block", building: "Lab Block", floor: "Ground & 1st Floor", rooms: "Physics, Chem, Biotech Labs", active_issues: 3, status: "ACTIVE" }
      ]);

      // 5. Problems (Upsert all sample tickets)
      const sampleProblems = [
        {
          ticket_id: "CPT-2026-0001",
          reporter_id: "CS24001",
          reporter_name: "Alex Johnson",
          reporter_email: "alex.j@college.edu",
          problem: {
            title: "Wi-Fi Access Point completely down in Block C, 3rd Floor",
            description: "The wireless access point covering Room C-302 and C-303 is completely unpowered. Over 60 computer science students are unable to perform lab assignments or access campus resources.",
            category_id: "cat_it",
            category_name: "IT & Network",
            location_id: "loc_block_c",
            location_name: "Block C — Engineering & IT Labs",
            image_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
          },
          priority: { user: "HIGH", admin: "CRITICAL" },
          assignment: { department_id: "dept_it", department_name: "IT Department", staff_id: "staff_001", staff_name: "Rahul Kumar" },
          status: "IN_PROGRESS",
          status_history: [
            { status: "REPORTED", timestamp: new Date("2026-09-15T10:32:00Z"), updated_by: "CS24001", note: "Submitted via mobile application" },
            { status: "VERIFIED", timestamp: new Date("2026-09-15T12:15:00Z"), updated_by: "ADMIN001", note: "Verified issue with Lab Assistant" },
            { status: "ASSIGNED", timestamp: new Date("2026-09-15T14:00:00Z"), updated_by: "ADMIN001", note: "Assigned to Network Operations Team" },
            { status: "IN_PROGRESS", timestamp: new Date("2026-09-16T09:20:00Z"), updated_by: "ADMIN001", note: "Replacement PoE switch dispatched" }
          ]
        },
        {
          ticket_id: "CPT-2026-0002",
          reporter_id: "EC24089",
          reporter_name: "Sneha Reddy",
          reporter_email: "sneha.r@college.edu",
          problem: {
            title: "Main Power Sub-Panel Tripping in Block B Physics Lab",
            description: "Circuit breaker 4B keeps tripping every time precision spectrometers are turned on. Causes risk of equipment damage and halts research work.",
            category_id: "cat_elec",
            category_name: "Electrical",
            location_id: "loc_block_b",
            location_name: "Block B — Science & Humanities",
            image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
          },
          priority: { user: "CRITICAL", admin: "CRITICAL" },
          assignment: { department_id: "dept_elec", department_name: "Electrical Department", staff_id: "staff_003", staff_name: "Amit Patel" },
          status: "VERIFIED",
          status_history: [
            { status: "REPORTED", timestamp: new Date("2026-09-16T11:05:00Z"), updated_by: "EC24089", note: "Reported directly from Physics Lab" },
            { status: "VERIFIED", timestamp: new Date("2026-09-16T11:45:00Z"), updated_by: "ADMIN001", note: "High electrical load risk confirmed" }
          ]
        },
        {
          ticket_id: "CPT-2026-0003",
          reporter_id: "ME23014",
          reporter_name: "Rohan Varma",
          reporter_email: "rohan.v@college.edu",
          problem: {
            title: "Water leakage from overhead tank connection in Hostel Block A",
            description: "Severe continuous seepage near Room 204 ceiling. Water dripping onto electrical conduit. Immediate plumbing inspection needed.",
            category_id: "cat_plumb",
            category_name: "Plumbing",
            location_id: "loc_hostel_a",
            location_name: "Hostel Block A (Boys)",
            image_url: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80"
          },
          priority: { user: "HIGH", admin: "HIGH" },
          assignment: { department_id: "dept_plumb", department_name: "Plumbing & Sanitation", staff_id: "staff_004", staff_name: "Ramesh Sharma" },
          status: "ASSIGNED",
          status_history: [
            { status: "REPORTED", timestamp: new Date("2026-09-17T08:12:00Z"), updated_by: "ME23014", note: "Water leakage reported" },
            { status: "VERIFIED", timestamp: new Date("2026-09-17T08:45:00Z"), updated_by: "ADMIN001", note: "Inspected by hostel assistant" },
            { status: "ASSIGNED", timestamp: new Date("2026-09-17T09:15:00Z"), updated_by: "ADMIN001", note: "Plumber team notified" }
          ]
        },
        {
          ticket_id: "CPT-2026-0004",
          reporter_id: "CE24055",
          reporter_name: "Kavya Sharma",
          reporter_email: "kavya.s@college.edu",
          problem: {
            title: "Broken window glass panel in Central Library 2nd Floor Reading Room",
            description: "Heavy rain yesterday caused wind damage. Sharp glass shards on table 14. Area restricted temporarily.",
            category_id: "cat_infra",
            category_name: "Infrastructure",
            location_id: "loc_library",
            location_name: "Central Library Building",
            image_url: null
          },
          priority: { user: "MEDIUM", admin: "HIGH" },
          assignment: { department_id: "dept_maint", department_name: "General Maintenance", staff_id: "staff_005", staff_name: "Deepak Yadav" },
          status: "REPORTED",
          status_history: [
            { status: "REPORTED", timestamp: new Date("2026-09-18T14:30:00Z"), updated_by: "CE24055", note: "Reported by Library Student Assistant" }
          ]
        },
        {
          ticket_id: "CPT-2026-0005",
          reporter_id: "EE24009",
          reporter_name: "Ananya Nair",
          reporter_email: "ananya.n@college.edu",
          problem: {
            title: "Smart Classroom Projector HDMI Port Damaged in Block A Room 102",
            description: "The ceiling-mounted projector audio/video output flickers continuously. Cable port pin is broken.",
            category_id: "cat_it",
            category_name: "IT & Network",
            location_id: "loc_block_a",
            location_name: "Block A — Administrative Wing",
            image_url: null
          },
          priority: { user: "MEDIUM", admin: "MEDIUM" },
          assignment: { department_id: "dept_it", department_name: "IT Department", staff_id: "staff_002", staff_name: "Priya Sundaram" },
          status: "RESOLVED",
          status_history: [
            { status: "REPORTED", timestamp: new Date("2026-09-12T09:00:00Z"), updated_by: "EE24009", note: "Reported by class representative" },
            { status: "RESOLVED", timestamp: new Date("2026-09-14T15:30:00Z"), updated_by: "ADMIN001", note: "HDMI receiver unit replaced and tested." }
          ],
          resolution: {
            note: "HDMI wall socket and receiver module completely replaced with brand new unit.",
            resolved_by: "Priya Sundaram (IT Dept)",
            resolved_at: new Date("2026-09-14T15:30:00Z")
          }
        },
        {
          ticket_id: "CPT-2026-0006",
          reporter_id: "CS24001",
          reporter_name: "Alex Johnson",
          reporter_email: "alex.j@college.edu",
          problem: {
            title: "Library 3rd floor AC leaking water",
            description: "Air conditioner unit in quiet reading area is leaking water onto study desks.",
            category_id: "cat_elec",
            category_name: "Electrical",
            location_id: "loc_library",
            location_name: "Central Library Building",
            image_url: null
          },
          priority: { user: "MEDIUM", admin: "MEDIUM" },
          assignment: { department_id: "dept_elec", department_name: "Electrical Department", staff_id: "staff_003", staff_name: "Amit Patel" },
          status: "REPORTED",
          status_history: [
            { status: "REPORTED", timestamp: new Date("2026-10-06T05:57:57Z"), updated_by: "CS24001", note: "Reported via student dashboard" }
          ]
        }
      ];

      for (const prob of sampleProblems) {
        await Problem.updateOne(
          { ticket_id: prob.ticket_id },
          { $setOnInsert: prob },
          { upsert: true }
        );
      }

      // 6. Feedback
      await Feedback.insertMany([
        {
          feedback_id: "fb_001",
          ticket_id: "CPT-2026-0005",
          problem_title: "Smart Classroom Projector HDMI Port Damaged in Block A Room 102",
          user_name: "Ananya Nair",
          user_id: "EE24009",
          rating: 5,
          comment: "Priya from IT came promptly and fixed the HDMI terminal right before our lecture. Extremely fast!",
          department_name: "IT Department"
        }
      ]);

      // 7. Notifications
      await Notification.insertMany([
        {
          notif_id: "notif_001",
          target: "ADMIN",
          title: "Critical Problem Escalated",
          message: "Critical electrical sub-panel tripping reported in Block B Physics Lab (CPT-2026-0002).",
          type: "CRITICAL",
          ticket_id: "CPT-2026-0002"
        },
        {
          notif_id: "snotif_001",
          target: "STUDENT",
          user_id: "CS24001",
          title: "Ticket Verified",
          message: "Your problem report CPT-2026-0001 has been verified by campus administration.",
          type: "INFO",
          ticket_id: "CPT-2026-0001"
        }
      ]);

      console.log('✅ MongoDB Initial Collection Seeding Complete!');
    }

    // ALWAYS ensure all 6 core sample tickets exist in MongoDB
    const sampleProblems = [
      {
        ticket_id: "CPT-2026-0001",
        reporter_id: "CS24001",
        reporter_name: "Alex Johnson",
        reporter_email: "alex.j@college.edu",
        problem: {
          title: "Wi-Fi Access Point completely down in Block C, 3rd Floor",
          description: "The wireless access point covering Room C-302 and C-303 is completely unpowered. Over 60 computer science students are unable to perform lab assignments or access campus resources.",
          category_id: "cat_it",
          category_name: "IT & Network",
          location_id: "loc_block_c",
          location_name: "Block C — Engineering & IT Labs",
          image_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
        },
        priority: { user: "HIGH", admin: "CRITICAL" },
        assignment: { department_id: "dept_it", department_name: "IT Department", staff_id: "staff_001", staff_name: "Rahul Kumar" },
        status: "IN_PROGRESS",
        status_history: [
          { status: "REPORTED", timestamp: new Date("2026-09-15T10:32:00Z"), updated_by: "CS24001", note: "Submitted via mobile application" },
          { status: "VERIFIED", timestamp: new Date("2026-09-15T12:15:00Z"), updated_by: "ADMIN001", note: "Verified issue with Lab Assistant" },
          { status: "ASSIGNED", timestamp: new Date("2026-09-15T14:00:00Z"), updated_by: "ADMIN001", note: "Assigned to Network Operations Team" },
          { status: "IN_PROGRESS", timestamp: new Date("2026-09-16T09:20:00Z"), updated_by: "ADMIN001", note: "Replacement PoE switch dispatched" }
        ]
      },
      {
        ticket_id: "CPT-2026-0002",
        reporter_id: "EC24089",
        reporter_name: "Sneha Reddy",
        reporter_email: "sneha.r@college.edu",
        problem: {
          title: "Main Power Sub-Panel Tripping in Block B Physics Lab",
          description: "Circuit breaker 4B keeps tripping every time precision spectrometers are turned on. Causes risk of equipment damage and halts research work.",
          category_id: "cat_elec",
          category_name: "Electrical",
          location_id: "loc_block_b",
          location_name: "Block B — Science & Humanities",
          image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
        },
        priority: { user: "CRITICAL", admin: "CRITICAL" },
        assignment: { department_id: "dept_elec", department_name: "Electrical Department", staff_id: "staff_003", staff_name: "Amit Patel" },
        status: "VERIFIED",
        status_history: [
          { status: "REPORTED", timestamp: new Date("2026-09-16T11:05:00Z"), updated_by: "EC24089", note: "Reported directly from Physics Lab" },
          { status: "VERIFIED", timestamp: new Date("2026-09-16T11:45:00Z"), updated_by: "ADMIN001", note: "High electrical load risk confirmed" }
        ]
      },
      {
        ticket_id: "CPT-2026-0003",
        reporter_id: "ME23014",
        reporter_name: "Rohan Varma",
        reporter_email: "rohan.v@college.edu",
        problem: {
          title: "Water leakage from overhead tank connection in Hostel Block A",
          description: "Severe continuous seepage near Room 204 ceiling. Water dripping onto electrical conduit. Immediate plumbing inspection needed.",
          category_id: "cat_plumb",
          category_name: "Plumbing",
          location_id: "loc_hostel_a",
          location_name: "Hostel Block A (Boys)",
          image_url: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80"
        },
        priority: { user: "HIGH", admin: "HIGH" },
        assignment: { department_id: "dept_plumb", department_name: "Plumbing & Sanitation", staff_id: "staff_004", staff_name: "Ramesh Sharma" },
        status: "ASSIGNED",
        status_history: [
          { status: "REPORTED", timestamp: new Date("2026-09-17T08:12:00Z"), updated_by: "ME23014", note: "Water leakage reported" },
          { status: "VERIFIED", timestamp: new Date("2026-09-17T08:45:00Z"), updated_by: "ADMIN001", note: "Inspected by hostel assistant" },
          { status: "ASSIGNED", timestamp: new Date("2026-09-17T09:15:00Z"), updated_by: "ADMIN001", note: "Plumber team notified" }
        ]
      },
      {
        ticket_id: "CPT-2026-0004",
        reporter_id: "CE24055",
        reporter_name: "Kavya Sharma",
        reporter_email: "kavya.s@college.edu",
        problem: {
          title: "Broken window glass panel in Central Library 2nd Floor Reading Room",
          description: "Heavy rain yesterday caused wind damage. Sharp glass shards on table 14. Area restricted temporarily.",
          category_id: "cat_infra",
          category_name: "Infrastructure",
          location_id: "loc_library",
          location_name: "Central Library Building",
          image_url: null
        },
        priority: { user: "MEDIUM", admin: "HIGH" },
        assignment: { department_id: "dept_maint", department_name: "General Maintenance", staff_id: "staff_005", staff_name: "Deepak Yadav" },
        status: "REPORTED",
        status_history: [
          { status: "REPORTED", timestamp: new Date("2026-09-18T14:30:00Z"), updated_by: "CE24055", note: "Reported by Library Student Assistant" }
        ]
      },
      {
        ticket_id: "CPT-2026-0005",
        reporter_id: "EE24009",
        reporter_name: "Ananya Nair",
        reporter_email: "ananya.n@college.edu",
        problem: {
          title: "Smart Classroom Projector HDMI Port Damaged in Block A Room 102",
          description: "The ceiling-mounted projector audio/video output flickers continuously. Cable port pin is broken.",
          category_id: "cat_it",
          category_name: "IT & Network",
          location_id: "loc_block_a",
          location_name: "Block A — Administrative Wing",
          image_url: null
        },
        priority: { user: "MEDIUM", admin: "MEDIUM" },
        assignment: { department_id: "dept_it", department_name: "IT Department", staff_id: "staff_002", staff_name: "Priya Sundaram" },
        status: "RESOLVED",
        status_history: [
          { status: "REPORTED", timestamp: new Date("2026-09-12T09:00:00Z"), updated_by: "EE24009", note: "Reported by class representative" },
          { status: "RESOLVED", timestamp: new Date("2026-09-14T15:30:00Z"), updated_by: "ADMIN001", note: "HDMI receiver unit replaced and tested." }
        ],
        resolution: {
          note: "HDMI wall socket and receiver module completely replaced with brand new unit.",
          resolved_by: "Priya Sundaram (IT Dept)",
          resolved_at: new Date("2026-09-14T15:30:00Z")
        }
      },
      {
        ticket_id: "CPT-2026-0006",
        reporter_id: "CS24001",
        reporter_name: "Alex Johnson",
        reporter_email: "alex.j@college.edu",
        problem: {
          title: "Library 3rd floor AC leaking water",
          description: "Air conditioner unit in quiet reading area is leaking water onto study desks.",
          category_id: "cat_elec",
          category_name: "Electrical",
          location_id: "loc_library",
          location_name: "Central Library Building",
          image_url: null
        },
        priority: { user: "MEDIUM", admin: "MEDIUM" },
        assignment: { department_id: "dept_elec", department_name: "Electrical Department", staff_id: "staff_003", staff_name: "Amit Patel" },
        status: "REPORTED",
        status_history: [
          { status: "REPORTED", timestamp: new Date("2026-10-06T05:57:57Z"), updated_by: "CS24001", note: "Reported via student dashboard" }
        ]
      }
    ];

    for (const prob of sampleProblems) {
      await Problem.updateOne(
        { ticket_id: prob.ticket_id },
        { $setOnInsert: prob },
        { upsert: true }
      );
    }

    console.log('✅ MongoDB Ticket Synchronization Complete!');
  } catch (err) {
    console.error('Error seeding MongoDB:', err);
  }
};
