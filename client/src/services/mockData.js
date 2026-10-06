// Centralized mock data matching MongoDB & Flask REST API specifications

export const INITIAL_DEPARTMENTS = [
  {
    id: "dept_it",
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
    id: "dept_elec",
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
    id: "dept_plumb",
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
    id: "dept_maint",
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
    id: "dept_clean",
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
    id: "dept_hostel",
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
    id: "dept_lib",
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
    id: "dept_sec",
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
];

export const INITIAL_STAFF = [
  {
    id: "staff_001",
    staff_id: "STF-IT-01",
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
    id: "staff_002",
    staff_id: "STF-IT-02",
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
    id: "staff_003",
    staff_id: "STF-ELEC-01",
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
    id: "staff_004",
    staff_id: "STF-PLUMB-01",
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
    id: "staff_005",
    staff_id: "STF-MAINT-01",
    name: "Deepak Yadav",
    email: "deepak.y@college.edu",
    phone: "+91 98111 22338",
    department_id: "dept_maint",
    department_name: "General Maintenance",
    role: "Carpentry Specialist",
    active_problems: 3,
    resolved_problems: 40,
    status: "ACTIVE"
  },
  {
    id: "staff_006",
    staff_id: "STF-HOSTEL-01",
    name: "Sanjay Gupta",
    email: "sanjay.g@college.edu",
    phone: "+91 98111 22339",
    department_id: "dept_hostel",
    department_name: "Hostel Administration",
    role: "Hostel Maintenance Supervisor",
    active_problems: 3,
    resolved_problems: 19,
    status: "ACTIVE"
  }
];

export const INITIAL_CATEGORIES = [
  { id: "cat_it", name: "IT & Network", code: "IT", description: "Wi-Fi, routers, computers, projector systems, server connectivity", icon: "Wifi", active_count: 8 },
  { id: "cat_elec", name: "Electrical", code: "ELEC", description: "Power failure, switches, fans, air conditioning, lab power points", icon: "Zap", active_count: 6 },
  { id: "cat_plumb", name: "Plumbing", code: "PLUMB", description: "Water leakages, tap repair, flush malfunction, RO water cooler issue", icon: "Droplets", active_count: 4 },
  { id: "cat_clean", name: "Cleaning", code: "CLEAN", description: "Classroom cleaning, trash overflow, restroom sanitation, spillages", icon: "Sparkles", active_count: 3 },
  { id: "cat_infra", name: "Infrastructure", code: "INFRA", description: "Broken desks, door locks, window panes, ceiling plaster, elevator", icon: "Building", active_count: 5 },
  { id: "cat_hostel", name: "Hostel Facilities", code: "HOSTEL", description: "Room amenities, mess quality, geyser malfunction, laundry area", icon: "Home", active_count: 4 },
  { id: "cat_lib", name: "Library", code: "LIB", description: "Book scanning terminals, quiet study room AC, electrical sockets", icon: "BookOpen", active_count: 2 },
  { id: "cat_lab", name: "Laboratory", code: "LAB", description: "Fume hood, gas supply, precision power supply, safety shower", icon: "FlaskConical", active_count: 2 },
  { id: "cat_sec", name: "Security & Safety", code: "SEC", description: "CCTV blindspot, gate barrier malfunction, emergency lights", icon: "ShieldAlert", active_count: 1 },
  { id: "cat_trans", name: "Transport", code: "TRANS", description: "Shuttle bus schedule, bus stop lighting, parking slot issues", icon: "Bus", active_count: 1 },
  { id: "cat_other", name: "Other", code: "OTHER", description: "General queries and miscellaneous campus issues", icon: "HelpCircle", active_count: 0 }
];

export const INITIAL_LOCATIONS = [
  { id: "loc_block_a", name: "Block A — Administrative Wing", building: "Block A", floor: "Ground to 4th Floor", rooms: "A-101 to A-412", active_issues: 3, status: "ACTIVE" },
  { id: "loc_block_b", name: "Block B — Science & Humanities", building: "Block B", floor: "Ground to 5th Floor", rooms: "B-101 to B-520", active_issues: 4, status: "ACTIVE" },
  { id: "loc_block_c", name: "Block C — Engineering & IT Labs", building: "Block C", floor: "Ground to 6th Floor", rooms: "C-101 to C-630", active_issues: 7, status: "ACTIVE" },
  { id: "loc_library", name: "Central Library Building", building: "Library", floor: "3 Floors", rooms: "Reading Halls 1-4, Digital Section", active_issues: 2, status: "ACTIVE" },
  { id: "loc_main_gate", name: "Main Gate & Security Complex", building: "Main Security Gate", floor: "Ground", rooms: "Gate 1, Visitor Cabin, Parking A", active_issues: 1, status: "ACTIVE" },
  { id: "loc_hostel_a", name: "Hostel Block A (Boys)", building: "Hostel A", floor: "4 Floors", rooms: "Rooms 101 to 440", active_issues: 5, status: "ACTIVE" },
  { id: "loc_hostel_b", name: "Hostel Block B (Girls)", building: "Hostel B", floor: "4 Floors", rooms: "Rooms 101 to 440", active_issues: 4, status: "ACTIVE" },
  { id: "loc_lab_block", name: "Advanced Research & Lab Block", building: "Lab Block", floor: "Ground & 1st Floor", rooms: "Physics, Chem, Biotech Labs", active_issues: 3, status: "ACTIVE" }
];

export const INITIAL_PROBLEMS = [
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
    priority: {
      user: "HIGH",
      admin: "CRITICAL"
    },
    assignment: {
      department_id: "dept_it",
      department_name: "IT Department",
      staff_id: "staff_001",
      staff_name: "Rahul Kumar"
    },
    status: "IN_PROGRESS",
    status_history: [
      { status: "REPORTED", timestamp: "2026-09-15T10:32:00Z", updated_by: "CS24001", note: "Submitted via mobile application" },
      { status: "VERIFIED", timestamp: "2026-09-15T12:15:00Z", updated_by: "ADMIN001", note: "Verified issue with Lab Assistant" },
      { status: "ASSIGNED", timestamp: "2026-09-15T14:00:00Z", updated_by: "ADMIN001", note: "Assigned to Network Operations Team" },
      { status: "IN_PROGRESS", timestamp: "2026-09-16T09:20:00Z", updated_by: "ADMIN001", note: "Replacement PoE switch dispatched" }
    ],
    resolution: null,
    created_at: "2026-09-15T10:32:00Z",
    updated_at: "2026-09-16T09:20:00Z"
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
    priority: {
      user: "CRITICAL",
      admin: "CRITICAL"
    },
    assignment: {
      department_id: "dept_elec",
      department_name: "Electrical Department",
      staff_id: "staff_003",
      staff_name: "Amit Patel"
    },
    status: "VERIFIED",
    status_history: [
      { status: "REPORTED", timestamp: "2026-09-16T11:05:00Z", updated_by: "EC24089", note: "Reported directly from Physics Lab" },
      { status: "VERIFIED", timestamp: "2026-09-16T11:45:00Z", updated_by: "ADMIN001", note: "High electrical load risk confirmed" }
    ],
    resolution: null,
    created_at: "2026-09-16T11:05:00Z",
    updated_at: "2026-09-16T11:45:00Z"
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
    priority: {
      user: "HIGH",
      admin: "HIGH"
    },
    assignment: {
      department_id: "dept_plumb",
      department_name: "Plumbing & Sanitation",
      staff_id: "staff_004",
      staff_name: "Ramesh Sharma"
    },
    status: "ASSIGNED",
    status_history: [
      { status: "REPORTED", timestamp: "2026-09-17T08:12:00Z", updated_by: "ME23014", note: "Water leakage reported" },
      { status: "VERIFIED", timestamp: "2026-09-17T08:45:00Z", updated_by: "ADMIN001", note: "Inspected by hostel assistant" },
      { status: "ASSIGNED", timestamp: "2026-09-17T09:15:00Z", updated_by: "ADMIN001", note: "Plumber team notified" }
    ],
    resolution: null,
    created_at: "2026-09-17T08:12:00Z",
    updated_at: "2026-09-17T09:15:00Z"
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
    priority: {
      user: "MEDIUM",
      admin: "HIGH"
    },
    assignment: {
      department_id: "dept_maint",
      department_name: "General Maintenance",
      staff_id: "staff_005",
      staff_name: "Deepak Yadav"
    },
    status: "REPORTED",
    status_history: [
      { status: "REPORTED", timestamp: "2026-09-18T14:30:00Z", updated_by: "CE24055", note: "Reported by Library Student Assistant" }
    ],
    resolution: null,
    created_at: "2026-09-18T14:30:00Z",
    updated_at: "2026-09-18T14:30:00Z"
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
    priority: {
      user: "MEDIUM",
      admin: "MEDIUM"
    },
    assignment: {
      department_id: "dept_it",
      department_name: "IT Department",
      staff_id: "staff_002",
      staff_name: "Priya Sundaram"
    },
    status: "RESOLVED",
    status_history: [
      { status: "REPORTED", timestamp: "2026-09-12T09:00:00Z", updated_by: "EE24009", note: "Reported by class representative" },
      { status: "VERIFIED", timestamp: "2026-09-12T10:15:00Z", updated_by: "ADMIN001", note: "Hardware issue confirmed" },
      { status: "ASSIGNED", timestamp: "2026-09-12T11:00:00Z", updated_by: "ADMIN001", note: "Assigned to Priya S." },
      { status: "IN_PROGRESS", timestamp: "2026-09-13T10:00:00Z", updated_by: "ADMIN001", note: "AV interface replacement underway" },
      { status: "RESOLVED", timestamp: "2026-09-14T15:30:00Z", updated_by: "ADMIN001", note: "HDMI receiver unit replaced and tested with professor laptop." }
    ],
    resolution: {
      note: "HDMI wall socket and receiver module completely replaced with brand new unit. Audio/Video signal verified.",
      resolved_by: "Priya Sundaram (IT Dept)",
      resolved_at: "2026-09-14T15:30:00Z"
    },
    created_at: "2026-09-12T09:00:00Z",
    updated_at: "2026-09-14T15:30:00Z"
  },
  {
    ticket_id: "CPT-2026-0006",
    reporter_id: "CS24099",
    reporter_name: "Tushar Gupta",
    reporter_email: "tushar.g@college.edu",
    problem: {
      title: "Request for personal gaming console setup in hostel room",
      description: "Requesting IT department to open custom NAT ports for personal PlayStation console in Hostel Room 304.",
      category_id: "cat_other",
      category_name: "Other",
      location_id: "loc_hostel_a",
      location_name: "Hostel Block A (Boys)",
      image_url: null
    },
    priority: {
      user: "LOW",
      admin: "LOW"
    },
    assignment: {
      department_id: null,
      department_name: null,
      staff_id: null,
      staff_name: null
    },
    status: "REJECTED",
    status_history: [
      { status: "REPORTED", timestamp: "2026-09-10T16:20:00Z", updated_by: "CS24099", note: "Submitted request" },
      { status: "REJECTED", timestamp: "2026-09-10T17:05:00Z", updated_by: "ADMIN001", note: "Violation of campus IT security policy" }
    ],
    rejection_reason: "Personal gaming port forwarding is not permitted under Campus IT Security Policy Section 4.2.",
    resolution: null,
    created_at: "2026-09-10T16:20:00Z",
    updated_at: "2026-09-10T17:05:00Z"
  },
  {
    ticket_id: "CPT-2026-0007",
    reporter_id: "BT24012",
    reporter_name: "Manish Joshi",
    reporter_email: "manish.j@college.edu",
    problem: {
      title: "Water Purifier RO Filter Alarm Beeping in Hostel Block B Mess",
      description: "The commercial RO water purifier has filter change indicator light blinking red and sound alarm going off.",
      category_id: "cat_plumb",
      category_name: "Plumbing",
      location_id: "loc_hostel_b",
      location_name: "Hostel Block B (Girls)",
      image_url: null
    },
    priority: {
      user: "HIGH",
      admin: "HIGH"
    },
    assignment: {
      department_id: "dept_plumb",
      department_name: "Plumbing & Sanitation",
      staff_id: "staff_004",
      staff_name: "Ramesh Sharma"
    },
    status: "IN_PROGRESS",
    status_history: [
      { status: "REPORTED", timestamp: "2026-09-18T07:45:00Z", updated_by: "BT24012", note: "Reported by Mess Manager" },
      { status: "VERIFIED", timestamp: "2026-09-18T08:30:00Z", updated_by: "ADMIN001", note: "Filter service due" },
      { status: "ASSIGNED", timestamp: "2026-09-18T09:00:00Z", updated_by: "ADMIN001", note: "Assigned to Ramesh S." },
      { status: "IN_PROGRESS", timestamp: "2026-09-18T10:15:00Z", updated_by: "ADMIN001", note: "Technician replacing pre-filter cartridges" }
    ],
    resolution: null,
    created_at: "2026-09-18T07:45:00Z",
    updated_at: "2026-09-18T10:15:00Z"
  },
  {
    ticket_id: "CPT-2026-0008",
    reporter_id: "CH24003",
    reporter_name: "Divya Kapoor",
    reporter_email: "divya.k@college.edu",
    problem: {
      title: "Fume Hood Exhaust Fan failure in Chemistry Research Lab 2",
      description: "Exhaust fan motor stopped operating. Toxic fumes accumulating during chemical distillation experiments.",
      category_id: "cat_lab",
      category_name: "Laboratory",
      location_id: "loc_lab_block",
      location_name: "Advanced Research & Lab Block",
      image_url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80"
    },
    priority: {
      user: "CRITICAL",
      admin: "CRITICAL"
    },
    assignment: {
      department_id: "dept_maint",
      department_name: "General Maintenance",
      staff_id: "staff_005",
      staff_name: "Deepak Yadav"
    },
    status: "IN_PROGRESS",
    status_history: [
      { status: "REPORTED", timestamp: "2026-09-19T11:20:00Z", updated_by: "CH24003", note: "Lab Safety Emergency" },
      { status: "VERIFIED", timestamp: "2026-09-19T11:30:00Z", updated_by: "ADMIN001", note: "Urgent lab hazard verified" },
      { status: "ASSIGNED", timestamp: "2026-09-19T11:45:00Z", updated_by: "ADMIN001", note: "Maintenance supervisor dispatched" },
      { status: "IN_PROGRESS", timestamp: "2026-09-19T12:10:00Z", updated_by: "ADMIN001", note: "Exhaust duct motor replacement underway" }
    ],
    resolution: null,
    created_at: "2026-09-19T11:20:00Z",
    updated_at: "2026-09-19T12:10:00Z"
  }
];

export const INITIAL_FEEDBACK = [
  {
    id: "fb_001",
    ticket_id: "CPT-2026-0005",
    problem_title: "Smart Classroom Projector HDMI Port Damaged in Block A Room 102",
    user_name: "Ananya Nair",
    user_id: "EE24009",
    rating: 5,
    comment: "Priya from IT came promptly and fixed the HDMI terminal right before our 2 PM lecture. Extremely fast and professional resolution!",
    department_name: "IT Department",
    resolved_date: "2026-09-14T15:30:00Z",
    feedback_date: "2026-09-14T17:10:00Z"
  },
  {
    id: "fb_002",
    ticket_id: "CPT-2026-0000_OLD1",
    problem_title: "Air Conditioner leaking water in Auditorium Hall B",
    user_name: "Karan Singh",
    user_id: "ME22005",
    rating: 4,
    comment: "The AC repair was done cleanly. Drip tray was replaced. Thanks to the electrical team!",
    department_name: "Electrical Department",
    resolved_date: "2026-09-08T12:00:00Z",
    feedback_date: "2026-09-09T09:30:00Z"
  },
  {
    id: "fb_003",
    ticket_id: "CPT-2026-0000_OLD2",
    problem_title: "Restroom Flush valve leak in Block C 1st Floor",
    user_name: "Nikhil Mehra",
    user_id: "CS23044",
    rating: 5,
    comment: "Quick work by sanitation team. Restroom is back to clean state.",
    department_name: "Plumbing & Sanitation",
    resolved_date: "2026-09-05T16:40:00Z",
    feedback_date: "2026-09-05T18:00:00Z"
  },
  {
    id: "fb_004",
    ticket_id: "CPT-2026-0000_OLD3",
    problem_title: "Elevator B door sensor misaligned in Admin Block",
    user_name: "Dr. Sunita Rao",
    user_id: "FAC_042",
    rating: 3,
    comment: "Took 2 days to resolve due to spare part delivery, but final work is good and safe.",
    department_name: "General Maintenance",
    resolved_date: "2026-09-02T11:15:00Z",
    feedback_date: "2026-09-02T14:20:00Z"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif_001",
    title: "Critical Problem Escalated",
    message: "Critical electrical sub-panel tripping reported in Block B Physics Lab (CPT-2026-0002).",
    timestamp: "2026-09-16T11:05:00Z",
    read: false,
    type: "CRITICAL",
    ticket_id: "CPT-2026-0002"
  },
  {
    id: "notif_002",
    title: "New Problem Submitted",
    message: "Wi-Fi outage reported in Block C 3rd Floor (CPT-2026-0001). Priority set to HIGH by student.",
    timestamp: "2026-09-15T10:32:00Z",
    read: false,
    type: "INFO",
    ticket_id: "CPT-2026-0001"
  },
  {
    id: "notif_003",
    title: "5-Star Feedback Received",
    message: "Ananya Nair submitted a 5-star rating for resolved ticket CPT-2026-0005.",
    timestamp: "2026-09-14T17:10:00Z",
    read: true,
    type: "FEEDBACK",
    ticket_id: "CPT-2026-0005"
  },
  {
    id: "notif_004",
    title: "Lab Safety Emergency",
    message: "Fume hood exhaust fan failure reported in Chemistry Lab (CPT-2026-0008).",
    timestamp: "2026-09-19T11:20:00Z",
    read: false,
    type: "CRITICAL",
    ticket_id: "CPT-2026-0008"
  }
];

export const INITIAL_ANALYTICS = {
  total_problems: 124,
  status_distribution: {
    reported: 14,
    verified: 18,
    assigned: 22,
    in_progress: 28,
    resolved: 36,
    rejected: 6
  },
  priority_distribution: {
    critical: 8,
    high: 34,
    medium: 52,
    low: 30
  },
  category_distribution: [
    { category: "IT & Network", count: 32 },
    { category: "Electrical", count: 26 },
    { category: "Plumbing", count: 20 },
    { category: "General Maintenance", count: 18 },
    { category: "Hostel Facilities", count: 14 },
    { category: "Library & Other", count: 14 }
  ],
  department_distribution: [
    { department: "IT Department", active: 8, resolved: 42 },
    { department: "Electrical Dept", active: 5, resolved: 38 },
    { department: "Plumbing & Sanit", active: 4, resolved: 29 },
    { department: "General Maint", active: 6, resolved: 51 },
    { department: "Hostel Admin", active: 7, resolved: 35 }
  ],
  monthly_trends: [
    { month: "Apr", reported: 45, resolved: 40 },
    { month: "May", reported: 52, resolved: 48 },
    { month: "Jun", reported: 38, resolved: 42 },
    { month: "Jul", reported: 60, resolved: 55 },
    { month: "Aug", reported: 74, resolved: 70 },
    { month: "Sep", reported: 82, resolved: 76 }
  ],
  performance_metrics: {
    avg_assignment_time_hours: 2.4,
    avg_resolution_time_hours: 18.6,
    recurring_problem_rate_pct: 4.2,
    user_satisfaction_score: 4.7
  },
  feedback_summary: {
    avg_rating: 4.6,
    total_feedback_count: 84,
    stars_5: 58,
    stars_4: 18,
    stars_3: 5,
    stars_2: 2,
    stars_1: 1
  }
};
