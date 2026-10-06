import User from '../models/User.js';

export const login = async (req, res) => {
  try {
    const { college_id, password } = req.body;
    if (!college_id || !password) {
      return res.status(400).json({ success: false, message: 'College ID and Password are required' });
    }

    const cidUpper = college_id.toUpperCase();

    // Admin Account Check
    if (cidUpper === 'ADMIN001' && password === 'password') {
      const user = {
        id: 'admin_usr_001',
        college_id: 'ADMIN001',
        name: 'Dr. Robert Vance',
        email: 'admin.vance@college.edu',
        role: 'admin',
        department: 'Campus Administration',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80'
      };
      const token = 'jwt_admin_secure_token_key_cpt_2026';
      return res.json({ success: true, token, user, message: 'Admin login successful' });
    }

    // Student Login
    if (password === 'password') {
      let dbUser = await User.findOne({ college_id: cidUpper });
      if (!dbUser) {
        dbUser = await User.create({
          college_id: cidUpper,
          name: cidUpper === 'CS24001' ? 'Alex Johnson' : `Student ${cidUpper}`,
          email: `${college_id.toLowerCase()}@college.edu`,
          role: 'student',
          department: 'Computer Science & Engineering',
          year: '3rd Year B.Tech'
        });
      }

      const userObj = {
        id: dbUser._id,
        college_id: dbUser.college_id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        department: dbUser.department,
        year: dbUser.year,
        avatar: dbUser.avatar
      };
      const token = `jwt_student_token_${college_id.toLowerCase()}`;
      return res.json({ success: true, token, user: userObj, message: 'Student login successful' });
    }

    return res.status(401).json({ success: false, message: 'Invalid credentials. Use CS24001 / password or ADMIN001 / password' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'No authorization header provided' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Invalid token' });

    if (token.includes('admin')) {
      return res.json({
        success: true,
        user: {
          id: 'admin_usr_001',
          college_id: 'ADMIN001',
          name: 'Dr. Robert Vance',
          email: 'admin.vance@college.edu',
          role: 'admin',
          department: 'Campus Administration',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80'
        }
      });
    }

    const studentId = token.replace('jwt_student_token_', '').toUpperCase() || 'CS24001';
    let dbUser = await User.findOne({ college_id: studentId });

    if (!dbUser) {
      return res.json({
        success: true,
        user: {
          id: `usr_${studentId.toLowerCase()}`,
          college_id: studentId,
          name: studentId === 'CS24001' ? 'Alex Johnson' : `Student ${studentId}`,
          email: `${studentId.toLowerCase()}@college.edu`,
          role: 'student',
          department: 'Computer Science & Engineering',
          year: '3rd Year B.Tech',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
        }
      });
    }

    return res.json({
      success: true,
      user: {
        id: dbUser._id,
        college_id: dbUser.college_id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        department: dbUser.department,
        year: dbUser.year,
        avatar: dbUser.avatar
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
