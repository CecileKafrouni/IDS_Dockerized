const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fileDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const fileSchema = mongoose.model('File',{
    index: Number,
    Dst_Port: Number,
    Tot_Bwd_Pkts: Number,
    Fwd_IAT_Std: Number,
    Fwd_PSH_Flags: Number,
    Fwd_Header_Len: Number,
    Fwd_Pkts_s: Number,
    Bwd_Pkts_s: Number,
    Pkt_Len_Max: Number,
    SYN_Flag_Cnt: Number,
    Subflow_Fwd_Pkts: Number,
    Subflow_Bwd_Pkts: Number,
    Init_Fwd_Win_Byts: Number,
    Init_Bwd_Win_Byts: Number,
    Fwd_Seg_Size_Min: Number,
    Intrusion: Number
});

module.exports = {fileSchema};
