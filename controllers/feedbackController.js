const Feedback=require('./models/Feedback');
const Ride=require('./models/require');//for checking ride exist or not
exports.submitFeedback=async(req,res)=>{
    try{
        const {rideId, toUser, rating, comment}=req.body;
         const fromUser = req.user.userId;
         if (!rideId || !toUser || !rating) {
      return res.status(400).json({ message: 'rideId, toUser, and rating are required' });
    }
    const existing = await Feedback.findOne({ rideId, fromUser, toUser });
    if (existing) {
      return res.status(400).json({ message: 'Feedback already submitted for this ride.' });
    }
    const feedback = new Feedback({
      rideId,
      fromUser,
      toUser,
      rating,
      comment
    });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
    };
exports.getFeedback=async(req,res)=>{
     try {
    const { rideId } = req.params;
    const feedbacks = await Feedback.find({ rideId }).populate('fromUser', 'name').populate('toUser', 'name');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
