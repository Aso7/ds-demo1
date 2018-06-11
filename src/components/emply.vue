<template>
    <div>
        <el-form ref="ruleForm" :model="ruleForm" label-width="80px">
            <el-form-item label="用户姓名" prop="name">
                <el-input size="small">
                </el-input>
            </el-form-item>
            <el-form-item label="用户姓名" prop="name">
                <el-input size="small">
                </el-input>
            </el-form-item>
            <el-form-item label="用户姓名" prop="name">
                <el-input v-model="ruleForm.group" size="small">
                </el-input>
            </el-form-item>
            <el-form-item label="归属组织" prop="name">
                <el-popover placement="bottom" width="400" trigger="click" @after-enter="toFetchGroup">
                    <el-container direction="vertical" v-loading="flag">
                        <el-form>
                            <el-input class="input" v-model="abc"></el-input>
                            <el-button @click="filterItem=abc">查询</el-button>
                        </el-form>
                        <el-table :data="filterGroup()(filterItem)" :height="300" @row-click="rowClick">
                            <el-table-column width="50" type="index" label="序号"></el-table-column>
                            <el-table-column width="120" property="ORGNAME" label="组织名称"></el-table-column>
                            <el-table-column width="230" property="FORGNAME" label="上级组织"></el-table-column>
                        </el-table>
                    </el-container>

                    <el-input v-model="newform.org" slot="reference" size="small">
                        <i class="el-icon-arrow-down el-input__icon" slot="suffix">
                        </i>
                    </el-input>
                </el-popover>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary">查询</el-button>
            </el-form-item>
        </el-form>
        <hr>
        <el-table size="small" :data="tableData" border style="width: 100%" v-loading="tableLoading">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="name" label="姓名" width="80"></el-table-column>
            <el-table-column prop="id" label="员工ID" width="120" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="code" label="员工编号" width="120"></el-table-column>
            <el-table-column prop="mobile" label="手机号" width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
            <el-table-column prop="org" label="归属组织" width="120"></el-table-column>
            <el-table-column prop="auth" label="权限" width="120"></el-table-column>
            <el-table-column prop="forg" label="上级组织" width="120" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="date" label="创建时间" width="120"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="change(scope)" type="text" size="small">编辑</el-button>
                    <el-button @click="remove(scope) " type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <el-pagination @current-change="pageChange" :page-size="pageSize" layout="prev, pager, next" :total="table.length">
            </el-pagination>
            <el-button size="small" type="primary" style="float:right" @click="addNew">添加</el-button>
        </div>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="50%">
            <el-form ref="newf" :rules="newFormRules" :model="newform" label-position="left">
                <el-form-item label="员工姓名" prop="name">
                    <el-input v-model="newform.name" size="small"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="newform.email" size="small"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select v-model="newform.code" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                </el-form-item>
                <el-form-item label="证件号码">
                    <el-input v-model="newform.id" auto-complete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="人员状态">
                    <el-input v-model="newform.status" auto-complete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="newform.mobile" auto-complete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="归属组织">
                    <el-input v-model="newform.name" auto-complete="off" size="small"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations} from "vuex"
export default {
    name: "emply",
    data() {
        let validator = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('不能为空'));
            }
            return callback()
        }
        return {
            ruleForm: {
                name: "test",
                group: '未知组织'
            },
            newform: {
                name: 'tests',
                email: '',
                code: '',
                id: '',
                auth: '',
                mobile: '',
                group: '',
                org: ''
            },
            newFormRules: {
               name: [
                    { required: true, message: "请填写姓名", trigger: "blur" },
                    {
                        type: "string",
                        message: "必须填写字符",
                        trigger: "change"
                    }
                ],
                email: [
                    {
                        required: true,
                        message: "请填写正确的邮箱格式",
                        trigger: "blur"
                    },
                    {
                        type: "email",
                        message: "请确认邮箱格式",
                        trigger: "change"
                    }
                ],
                code: [
                    {
                        required: true,
                        message: "请填写的证件号",
                        trigger: "blur"
                    }
                ]
            },
            flag: false,
            filterItem: '',
            abc: '',
            tableLoading: false,
            pageSize: 5,
            page: 1,
            formLabelWidth: 90,
            dialogFormVisible: false
        }
    },
    computed: {
        tableData() {
            let tableArr = this.$store.state.table.slice(this.pageSize * (this.page - 1), this.pageSize * this.page)
            return tableArr
        },
        ...mapState(['table'])
        //...mapState(["group"])
        //    group(){
        //         return this.filterGroup()(this.filterItem)
        //    }
    },
    watch: {
        group(_old, _new) {
            console.log(_old)
            console.log(_new)
            this.flag = false
        }
    },
    methods: {
        toFetchGroup() {
            this.flag = true
            this.fetchGroup(() => {
                this.flag = false
            })
        },
        toFetchTable() {
            this.tableLoading = true;
            this.fetchTable(() => {
                this.tableLoading = false
            })
        },
        rowClick(row, event, column) {
            console.log(row)
            this.ruleForm.group = row.ORGNAME
        },
        remove(scope) {
            console.log(scope.row)
            this.$confirm("您确定删除吗", "提示", {
                callback:()=> {
                    console.log('ok')
                    this.deleteItem({
                        code:scope.row.code,
                        cb:()=>{
                            this.$message("删除成功")
                        }
                    })
                }
            })
        },
        change(scope) {
            console.log(scope);
            this.dialogFormVisible = true;
            this.newform = scope.row
        },
        sure() {
            this.$refs.newf.validate((isValid, tag) => {
                console.log(isValid);
                console.log(tag);
                this.dialogFormVisible = false;
                //this.$http('/addnew',this.newfrom).then(res=>{ })
            });
        },
        pageChange(page) {
            this.page = page
        },
        addNew() {
            this.newform = {
                name: 'tests',
                email: '',
                code: '',
                id: '',
                auth: '',
                mobile: '',
                group: '',
                org: ''
            }
            this.dialogFormVisible = true
        },
        ...mapMutations(['deleteItem']),
        ...mapActions(["fetchGroup", "fetchTable",'deleteItem']),
        ...mapGetters(["filterGroup"])
    },
    mounted() {
        this.toFetchTable()
    }
}
</script>
<style scoped>
.el-form-item {
    display: inline-block;
}

.el-pagination {
    display: inline-block;
}

.el-main {
    text-align: left!important
}
</style>
