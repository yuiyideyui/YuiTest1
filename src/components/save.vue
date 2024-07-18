<template>
	<div>
		<cardCom
			title="脆弱人员列表"
			width="422px"
			:topIcon="false"
			:empty="false"
			lineWidth="189px"
		>
			<div style="height: 78vh">
				<div class="vulListBox">
					<div
						v-for="(item, index) in vulPeopleList"
						:key="index + ''"
						class="vulListItemBox"
						:class="{ active: iswarnActive.includes(item.id.toString()) }"
					>
						<div class="vulListone">
							<p>姓名：{{ item.name }}</p>
							<p>年龄：{{ item.age }}</p>
							<p>健康状态：{{ item.hel }}</p>
						</div>
						<div class="vulListTwo">
							<p>住址：{{ item.address }}</p>
						</div>
					</div>
				</div>
				<cardCom :children="true" title="呼叫监控">
					<div class="CallMonitorMesBox">
						<div
							class="alarmMessageBox"
							ref="callalarmMessageBox"
							v-if="CallMsgList.length > 0"
						>
							<div class="filemessage" ref="callfilemessage">
								<div
									class="fileAlarmBox"
									v-for="(item_2, index_2) in CallMsgList"
									:key="index_2"
								>
									<p class="name">{{ item_2.time }}</p>
									<p>{{ item_2.message }}</p>
								</div>
							</div>
						</div>
						<div v-else class="messageempty">暂无呼叫</div>
					</div>
				</cardCom>
				<cardCom :children="true" title="急救进展消息">
					<div class="FiraidMesBox">
						<div
							class="alarmMessageBox"
							ref="firaidalarmMessageBox"
							v-if="FiraidMesList.length > 0"
						>
							<div class="filemessage" ref="firaidfilemessage">
								<div
									class="fileAlarmBox"
									v-for="(item_2, index_2) in FiraidMesList"
									:key="index_2"
								>
									<p class="name">{{ item_2.time }}</p>
									<p>{{ item_2.message }}</p>
								</div>
							</div>
						</div>
						<div v-else class="messageempty">暂无急救任务</div>
					</div>
				</cardCom>
			</div>
		</cardCom>
		<EmergencyMsgBox
            v-for="(item,index) in warnmsgList" :key="index+''"
			v-show="iswarnActive.includes(item.id.toString())"
			:warnmsgList="item.data"
			@determine="determine"
			@close="close"
            :boxid="item.id"
            :xyindex="index+1"
		/>
	</div>
</template>

<script>
import cardCom from '../cardCom.vue'
import EmergencyMsgBox from '../EmergencyMsgBox'
import firaidfilemessage from './firstAidMessage.vue'
import { FireAlarmInformation } from '../../api/WebSocket'
export default {
	components: {
		cardCom,
		EmergencyMsgBox,
		firaidfilemessage,
	},
	data() {
		return {
			vulPeopleList: [
				{
					name: '潘*梅',
					age: 73,
					hel: '良好',
					address: '宣城市绩溪县印潭路217号37号楼908房',
					id: 1,
				},
				{
					name: '陈*国',
					age: 85,
					hel: '良好',
					address: '宣城市绩溪县印潭路217号26号楼302房',
					id: 2,
				},
				{
					name: '李*芳',
					age: 65,
					hel: '健康',
					address: '宣城市绩溪县印潭路217号15号楼201房',
					id: 3,
				},
				{
					name: '林*红',
					age: 75,
					hel: '良好',
					address: '宣城市绩溪县印潭路217号38号楼605房',
					id: 4,
				},
				{
					name: '崔*海',
					age: 80,
					hel: '一般',
					address: '宣城市绩溪县印潭路217号33号楼306房',
					id: 5,
				},
				{
					name: '梁*均',
					age: 68,
					hel: '健康',
					address: '宣城市绩溪县印潭路217号53号楼503房',
					id: 6,
				},
				{
					name: '陈*健',
					age: 83,
					hel: '较差',
					address: '宣城市绩溪县印潭路217号10号楼308房',
					id: 7,
				},
			],
			CallMsgList: [],
			FiraidMesList: [],
			Callws: null,
			Firaid: null,
			showcallbox: [],
			warnmsgList: [],
			iswarnActive: [],
			//初始化高度
			firaidalarmMessageBoxH: null,
			callalarmMessageBoxH: null,
		}
	},
	methods: {
		determine(e) {
			// 确定后促发操作
			this.iswarnActive = this.iswarnActive.filter((item) => {
				return item !== e
			})
			this.$store.dispatch('setVillageTypeAct', 'firstAidMessage')
		},
		close(e) {
			this.iswarnActive = this.iswarnActive.filter((item) => {
				return item !== e
			})
			this.$store.dispatch('village/getFiraidstate', false)
		},
		//传入参数（信息盒子的高度，信息List的高度(this.$refs.xxxxx.clientHeight),要移动的盒子（this.$refs））
		scrollmove(messageBoxH, messageH, messageBox) {
			if (messageBoxH < messageH) {
				messageBox.scrollTo({
					top: messageH - messageBoxH,
					behavior: 'smooth',
				})
			}
		},
	},
	mounted() {
		// this.Callws = FireAlarmInformation(3002, '123456')
		this.Callws = new WebSocket(`ws://192.168.0.159:3003/socket/callmonitoring`)
		this.Callws.onmessage = (mes) => {
			this.$store.dispatch('village/getFiraidstate', true)
			this.warnmsgList.push({
				data: [
					{
						name: '呼叫时间：',
						value: '2022-07-11 16:00:00',
					},
					{
						name: '患者姓名：',
						value: '潘*梅',
					},
					{
						name: '呼叫方式：',
						value: '主动呼叫',
					},
					{
						name: '绑定手机号：',
						value: '130****4862',
					},
					{
						name: '住址：',
						value: '宣城市绩溪县印潭路217号37号楼908房',
					},
					{
						name: '大致病情：',
						value: '胸闷喘不过气',
					},
				],
				id: JSON.parse(mes.data).id.toString(),
			})
			this.iswarnActive.push(JSON.parse(mes.data).id.toString())
			if (JSON.parse(mes.data)?.end) {
				console.log('end')
				this.Callws.close()
			}
			this.CallMsgList.push(JSON.parse(mes.data))
			this.$nextTick(() => {
				this.scrollmove(
					this.$refs.callalarmMessageBox.clientHeight,
					this.$refs.callfilemessage.clientHeight,
					this.$refs.callalarmMessageBox
				)
			})
		}
		// this.Firaid = FireAlarmInformation(3003, '123456')
		this.Firaid = new WebSocket(`ws://192.168.0.159:3003/socket/Emergencypros`)
		this.Firaid.onmessage = (mes) => {
			if (JSON.parse(mes.data)?.end) {
				console.log('end')
				this.Firaid.close()
			}
			this.FiraidMesList.push(JSON.parse(mes.data))
			this.$nextTick(() => {
				this.scrollmove(
					this.$refs.firaidalarmMessageBox.clientHeight,
					this.$refs.firaidfilemessage.clientHeight,
					this.$refs.firaidalarmMessageBox
				)
			})
		}
	},
	beforeDestroy() {
		this.Callws.close()
		this.Firaid.close()
	},
}
</script>

<style lang="scss" scoped>
.vulListBox {
	height: 49.2vh;
	overflow: auto;
	.vulListItemBox {
		font-size: 14px;
		font-family: 'webfont-regular';
		font-weight: 400;
		color: #ffffff;
		background: rgba(1, 8, 24, 0.5);
		margin: 0 6px 0 15px;
		padding: 0 29px 0 11px;
		margin-top: 12px;
		height: 8.5vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border-left: 3px solid;
		border-image: linear-gradient(
				180deg,
				#127ffe 0%,
				rgba(31, 223, 250, 0.3) 100%
			)
			1;
		&.active {
			font-family: 'webfont-medium';
			color: #ff5f5f;
			border-color: #ff5f5f;
			border-image: none;
		}
		.vulListone {
			display: flex;
			justify-content: space-between;
		}
		.vulListTwo {
		}
		p {
			margin: 8px 0;
		}
	}
}
.CallMonitorMesBox {
	height: 8vh;
	.alarmMessageBox {
		height: 8vh;
	}
}
.FiraidMesBox {
	height: 12vh;
	.fileAlarmBox:last-of-type p {
		font-family: 'webfont-medium' !important;
		color: #00fff0 !important;
	}
	.alarmMessageBox {
		height: 11vh;
	}
}
.alarmMessageBox {
	overflow: auto;
	position: relative;
	.fileAlarmBox {
		display: flex;
		color: #ffffff;
		display: flex;
		align-items: baseline;
		border-top: 0;
		border-image: linear-gradient(
				90deg,
				rgba(201, 201, 201, 0),
				rgba(219, 219, 219, 1),
				rgba(173, 173, 173, 0)
			)
			1 1;
		border-bottom: 1px solid;
		padding: 10px;
		.name {
			width: 141px;
			flex-shrink: 0;
		}
		p {
			font-size: 14px;
			font-weight: 400;
			color: #ffffff;
			margin: 0;
			font-family: 'webfont-regular';
		}
	}
	&::-webkit-scrollbar {
		display: block;
		width: 5px;
	}

	&::-webkit-scrollbar-thumb {
		background: #4b6ce0;
		display: block;
	}
	.fileAlarmBox p {
		font-family: 'webfont-regular' !important;
	}
}
.messageempty {
	font-family: 'webfont-regular';
	height: 30px;
	font-size: 14px;
	font-weight: 400;
	color: #ffffff;
	text-align: center;
	margin-top: 10px;
	border-bottom: 1px solid;
	border-image: linear-gradient(
			90deg,
			rgba(201, 201, 201, 0),
			rgba(219, 219, 219, 1),
			rgba(173, 173, 173, 0)
		)
		1 1;
}

.container{
	position: absolute; 
	z-index: 1000;
}
.content{
	display: flex;
	align-items: center;
	color: white;
	font-size: 14px;
}
.poi{
	position: absolute;
}
.sos{
	background-image: url(../../assets/images/医疗急救/急救呼叫.png);
    background-size: 40px 40px;
    background-repeat: no-repeat;
	height: 40px;
    width: 40px;
}
.hospital{
	background-image: url(../../assets/images/医疗急救/医院icon.png);
    background-size: 25px 25px;
    background-repeat: no-repeat;
	height: 20px;
    width: 25px;
	margin-right: 3px;
}
</style>