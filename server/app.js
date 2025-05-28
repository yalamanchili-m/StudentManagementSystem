const express = require('express'), mongoose = require('mongoose'), cors = require('cors');
const app = express().use(cors(), express.json());

mongoose.connect('mongodb://localhost:27017/studentdb')
  .then(() => console.log('MongoDB connected')).catch(console.error);

const Student = mongoose.model('Student', new mongoose.Schema({
  name: String, age: Number, course: String, year: Number
}, { timestamps: true }));

const handler = async (res, fn, status = 200) => {
  try { res.status(status).json(await fn()); }
  catch (err) { res.status(status === 201 ? 400 : 500).json({ message: err.message }); }
};

app.post('/students', (req, res) => handler(res, () => new Student(req.body).save(), 201));
app.get('/students', (req, res) => handler(res, () => Student.find()));

app.route('/students/:id')
  .put((req, res) => handler(res, () => Student.findByIdAndUpdate(req.params.id, req.body, { new: true }) || Promise.reject({ message: 'Not found' })))
  .delete((req, res) => handler(res, async () => {
  console.log('Delete request for id:', req.params.id);
  const deleted = await Student.findByIdAndDelete(req.params.id);
  console.log('Deleted document:', deleted);
  if (!deleted) throw new Error('Not found');
  return { message: 'Deleted' };
}));


app.listen(9000, () => console.log('Server running on 9000'));
