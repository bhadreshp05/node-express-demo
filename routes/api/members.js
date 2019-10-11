const express = require('express');
const router = express.Router();
const members = require('../../Members');

// GET all members
router.get('/', (req, res) => {
	res.json(members);
});

// GET single member
router.get('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));
	if (found) {
		res.json(members.filter(member => member.id === parseInt(req.params.id)));
	} else {
		res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
	}
});

// Create member
router.post('/', (req, res) => {
	const newMember = {
		id: new Date(),
		name: req.body.name,
		email: req.body.email,
		status: 'active'
	};

	if (!newMember.name || !newMember.email) {
		return res.status(400).json({ msg: 'Please include name or email' });
	}

	members.push(newMember);

	// res.json(members);
	res.redirect('/'); // redirect to home after member have been added.
});

// Update member
router.put('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));
	if (found) {
		const updMember = req.body;
		members.forEach(member => {
			if (member.id === parseInt(req.params.id)) {
				member.name = updMember.name ? updMember.name : member.name;
				member.email = updMember.email ? updMember.email : member.email;

				res.json({ msg: 'Member updated', member });
			}
		});
	} else {
		res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
	}
});

// Delete member
router.delete('/:id', (req, res) => {
	const found = members.some(member => member.id === parseInt(req.params.id));

	if (found) {
		const filteredMembers = members.filter(
			member => member.id !== parseInt(req.params.id)
		);

		members = filteredMembers;
		res.json({ msg: 'Member Deleted', members: filteredMembers });
	} else {
		res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
	}
});

module.exports = router;
