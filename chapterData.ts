import { BossInfo } from './types';

interface ChapterData {
  title: string;
  boss: BossInfo;
}

const DEFAULT_BOSS_VISUAL = "Chinese general, ancient armor, chibi style, cute, sticker";

const DATA: ChapterData[] = [
  {
    title: "宴桃园豪杰三结义 斩黄巾英雄首立功",
    boss: { name: "张角", courtesy: "号 天公将军", description: "苍天已死，黄天当立，岁在甲子，天下大吉。", visualPrompt: "Zhang Jiao, yellow turban rebellion leader, taoist robes, holding magic spell paper, wild hair, sword, magic effects" }
  },
  {
    title: "张翼德怒鞭督邮 何国舅谋诛宦竖",
    boss: { name: "张飞", courtesy: "字 翼德", description: "豹头环眼，燕颔虎须，怒鞭督邮泄不平之气。", visualPrompt: "Zhang Fei, black face, wild beard, holding serpent spear, angry expression, simple cloth armor" }
  },
  {
    title: "议温明董卓叱丁原 馈金珠李肃说吕布",
    boss: { name: "董卓", courtesy: "字 仲颖", description: "废立皇帝，独揽朝政，权倾朝野的西凉魔王。", visualPrompt: "Dong Zhuo, fat tyrant, luxurious armor, holding sword, evil grin, beard" }
  },
  {
    title: "废汉帝陈留践位 谋董卓孟德献刀",
    boss: { name: "陈宫", courtesy: "字 公台", description: "捉放曹，义释孟德，却见其错杀吕伯奢一家。", visualPrompt: "Chen Gong, magistrate official robes, holding sword, conflicted expression" }
  },
  {
    title: "发矫诏诸镇应曹公 破关兵三英战吕布",
    boss: { name: "华雄", courtesy: "西凉猛将", description: "汜水关前斩将立威，可惜遇到了马弓手关羽。", visualPrompt: "Hua Xiong, fierce general, heavy armor, holding long blade, arrogant" }
  },
  {
    title: "焚金阙董卓行凶 匿玉玺孙坚背约",
    boss: { name: "孙坚", courtesy: "字 文台", description: "江东猛虎，率先攻入洛阳，却因玉玺种下祸根。", visualPrompt: "Sun Jian, tiger general, red bandana, holding jade seal box, brave" }
  },
  {
    title: "袁绍磐河战公孙 孙坚跨江击刘表",
    boss: { name: "公孙瓒", courtesy: "字 伯珪", description: "白马将军，威震塞外，与袁绍磐河争锋。", visualPrompt: "Gongsun Zan, white armor, white cape, holding spear, noble look" }
  },
  {
    title: "王司徒巧使连环计 董太师大闹凤仪亭",
    boss: { name: "貂蝉", courtesy: "绝世舞姬", description: "巧施连环计，周旋于吕布董卓之间，红颜救国。", visualPrompt: "Diao Chan, beautiful dancer, pink and white hanfu, holding fan, elegant" }
  },
  {
    title: "除暴凶吕布助司徒 犯长安李傕听贾诩",
    boss: { name: "王允", courtesy: "字 子师", description: "司徒王允，计除国贼，却因刚愎自用身死国门。", visualPrompt: "Wang Yun, elderly minister, official robes, holding decree, serious" }
  },
  {
    title: "勤王室马腾举义 报父仇曹操兴师",
    boss: { name: "马腾", courtesy: "字 寿成", description: "西凉太守，依诏勤王，马超之父。", visualPrompt: "Ma Teng, western armor, fur collar, holding sword, stern" }
  },
  {
    title: "刘皇叔北海救孔融 吕温侯濮阳破曹操",
    boss: { name: "太史慈", courtesy: "字 子义", description: "北海突围，神射无双，为救孔融单骑求援。", visualPrompt: "Taishi Ci, dual short halberds on back, holding bow, dynamic pose" }
  },
  {
    title: "陶恭祖三让徐州 曹孟德大战吕布",
    boss: { name: "陶谦", courtesy: "字 恭祖", description: "三让徐州，忧劳成疾，将大任托付刘备。", visualPrompt: "Tao Qian, old kind governor, simple robes, offering official seal" }
  },
  {
    title: "李傕郭汜大交兵 杨奉董承双救驾",
    boss: { name: "李傕", courtesy: "西凉军阀", description: "挟持天子，祸乱长安，凶残成性的军阀。", visualPrompt: "Li Jue, villain general, dark armor, laughing wildly, torch in hand" }
  },
  {
    title: "曹孟德移驾幸许都 吕奉先乘夜袭徐郡",
    boss: { name: "曹操", courtesy: "字 孟德", description: "挟天子以令诸侯，迁都许昌，霸业初成。", visualPrompt: "Cao Cao, warlord, purple robes, holding sword, ambitious look" }
  },
  {
    title: "太史慈酣斗小霸王 孙伯符大战严白虎",
    boss: { name: "孙策", courtesy: "字 伯符", description: "江东小霸王，挟死一将喝死一将，威震江东。", visualPrompt: "Sun Ce, young hero, golden armor, holding spear, energetic" }
  },
  {
    title: "吕奉先射戟辕门 曹孟德败师淯水",
    boss: { name: "吕布", courtesy: "字 奉先", description: "辕门射戟，解两家之斗，箭术盖世无双。", visualPrompt: "Lu Bu, pheasant tail headdress, red horse (Red Hare), holding sky piercer halberd" }
  },
  {
    title: "袁公路大起七军 曹孟德会合三将",
    boss: { name: "袁术", courtesy: "字 公路", description: "妄自尊大，淮南称帝，终成冢中枯骨。", visualPrompt: "Yuan Shu, emperor crown (fake), holding honey water cup, arrogant but weak" }
  },
  {
    title: "贾文和料敌决胜 夏侯惇拔矢啖睛",
    boss: { name: "贾诩", courtesy: "字 文和", description: "算无遗策，毒士贾诩，宛城之战大败曹操。", visualPrompt: "Jia Xu, strategist, dark robes, fan, calculating eyes" }
  },
  {
    title: "下邳城曹操鏖兵 白门楼吕布殒命",
    boss: { name: "高顺", courtesy: "陷阵营", description: "攻无不克陷阵营，忠臣不事二主，从容就义。", visualPrompt: "Gao Shun, stoic general, heavy shield, discipline, serious" }
  },
  {
    title: "曹阿瞒许田打围 董国舅内阁受诏",
    boss: { name: "董承", courtesy: "国舅", description: "受衣带诏，誓杀曹贼，虽然事败由于天意。", visualPrompt: "Dong Cheng, official robes, holding blood decree hidden in belt" }
  },
  {
    title: "曹操煮酒论英雄 关公赚城斩车胄",
    boss: { name: "曹操", courtesy: "字 孟德", description: "青梅煮酒，指点江山，天下英雄唯使君与操耳。", visualPrompt: "Cao Cao, sitting, holding wine cup, pointing finger, plum blossoms background" }
  },
  {
    title: "袁曹各起马步三军 关张共擒王刘二将",
    boss: { name: "陈琳", courtesy: "字 孔璋", description: "一纸檄文，骂得曹操头风顿愈，文采飞扬。", visualPrompt: "Chen Lin, scholar, holding brush and long scroll, shouting" }
  },
  {
    title: "祢正平裸衣骂贼 吉太医下毒遭刑",
    boss: { name: "祢衡", courtesy: "字 正平", description: "击鼓骂曹，狂傲不羁，赤身裸体羞辱权贵。", visualPrompt: "Ni Heng, beating drum, torn clothes/half naked, crazy expression" }
  },
  {
    title: "国贼行凶杀贵妃 皇叔败走投袁绍",
    boss: { name: "吉平", courtesy: "太医", description: "咬指为誓，断指存节，太医下毒只为除贼。", visualPrompt: "Ji Ping, doctor robes, holding medicine bowl, defiant" }
  },
  {
    title: "屯土山关公约三事 救白马曹操解重围",
    boss: { name: "颜良", courtesy: "河北名将", description: "白马坡前，连斩宋宪魏续，勇冠三军。", visualPrompt: "Yan Liang, heavy armor, Hebei style, holding big blade, fierce" }
  },
  {
    title: "袁本初败兵折将 关云长挂印封金",
    boss: { name: "文丑", courtesy: "河北名将", description: "延津口射退张辽，大战徐晃，终被关羽所斩。", visualPrompt: "Wen Chou, heavy armor, bow and arrow, fierce face" }
  },
  {
    title: "美髯公千里走单骑 汉寿侯五关斩六将",
    boss: { name: "卞喜", courtesy: "流星锤", description: "汜水关守将，埋伏刀斧手，却被关羽识破。", visualPrompt: "Bian Xi, ambush general, holding meteor hammer weapon" }
  },
  {
    title: "斩蔡阳兄弟释疑 会古城主臣聚义",
    boss: { name: "蔡阳", courtesy: "曹军大将", description: "不听解释，千里追杀，古城下成了关羽表白心迹的祭品。", visualPrompt: "Cai Yang, old general, angry, charging with blade" }
  },
  {
    title: "小霸王怒斩于吉 碧眼儿坐领江东",
    boss: { name: "于吉", courtesy: "神仙", description: "呼风唤雨，救人治病，却遭孙策嫉恨斩杀。", visualPrompt: "Yu Ji, taoist immortal, walking stick, mystical aura, ghost like" }
  },
  {
    title: "战官渡本初败绩 劫乌巢孟德烧粮",
    boss: { name: "许攸", courtesy: "字 子远", description: "弃袁投曹，献计火烧乌巢，官渡之战第一功臣。", visualPrompt: "Xu You, advisor, sneaky look, pointing at map (Wuchao)" }
  },
  {
    title: "曹操仓亭破本初 玄德荆州依刘表",
    boss: { name: "袁绍", courtesy: "字 本初", description: "四世三公，河北霸主，仓亭兵败吐血而亡。", visualPrompt: "Yuan Shao, golden armor, noble but defeated/sad expression, coughing blood" }
  },
  {
    title: "夺冀州袁尚争锋 决漳河许攸献计",
    boss: { name: "袁尚", courtesy: "字 显甫", description: "袁绍幼子，美貌骁勇，却因兄弟阋墙痛失基业。", visualPrompt: "Yuan Shang, young handsome general, fancy armor, desperate" }
  },
  {
    title: "曹丕乘乱纳甄氏 郭嘉遗计定辽东",
    boss: { name: "郭嘉", courtesy: "字 奉孝", description: "遗计定辽东，算无遗策，天妒英才。", visualPrompt: "Guo Jia, frail scholar, sitting in carriage, holding scroll, wise eyes" }
  },
  {
    title: "蔡夫人隔屏听密语 刘皇叔跃马过檀溪",
    boss: { name: "蔡貌", courtesy: "字 德硅", description: "荆州水军都督，设计陷害刘备，心胸狭窄。", visualPrompt: "Cai Mao, naval armor, cunning face, whispering" }
  },
  {
    title: "玄德南漳逢水镜 单福新野遇英主",
    boss: { name: "徐庶", courtesy: "字 元直", description: "化名单福，新野破阵，走马荐诸葛。", visualPrompt: "Xu Shu, scholar with sword, singing, blue robes" }
  },
  {
    title: "玄德用计袭樊城 元直走马荐诸葛",
    boss: { name: "曹仁", courtesy: "字 子孝", description: "摆下八门金锁阵，却被徐庶识破惨败。", visualPrompt: "Cao Ren, general, heavy armor, confused, holding formation flag" }
  },
  {
    title: "司马徽再荐名士 刘玄德三顾草庐",
    boss: { name: "司马徽", courtesy: "水镜先生", description: "伏龙凤雏，两人得一，可安天下。", visualPrompt: "Sima Hui, hermit, playing guqin, peaceful, forest background" }
  },
  {
    title: "定三分隆中决策 战长江孙氏报仇",
    boss: { name: "诸葛亮", courtesy: "字 孔明", description: "隆中高卧，未出茅庐，已知天下三分。", visualPrompt: "Zhuge Liang (Young), feather fan, crane robes, wisdom, map of three kingdoms" }
  },
  {
    title: "荆州城公子三求计 博望坡军师初用兵",
    boss: { name: "夏侯惇", courtesy: "字 元让", description: "盲夏侯，轻视孔明，博望坡火烧屁股。", visualPrompt: "Xiahou Dun, one eye patch, angry, scorched armor, fire background" }
  },
  {
    title: "蔡夫人议献荆州 诸葛亮火烧新野",
    boss: { name: "蔡夫人", courtesy: "刘表继室", description: "妇人干政，献出荆州基业，最终死于乱军。", visualPrompt: "Lady Cai, rich silk robes, scheming face, holding seal" }
  },
  {
    title: "刘玄德携民渡江 赵子龙单骑救主",
    boss: { name: "赵云", courtesy: "字 子龙", description: "血染征袍透甲红，当阳谁敢与争锋。", visualPrompt: "Zhao Yun, white armor, silver spear, baby (Adou) strapped to chest, blood stained" }
  },
  {
    title: "张翼德大闹长坂桥 刘豫州败走汉津口",
    boss: { name: "张飞", courtesy: "字 翼德", description: "据水断桥，一声怒吼，吓退曹操百万大军。", visualPrompt: "Zhang Fei, on horse, serpent spear raised, shouting, bridge background" }
  },
  {
    title: "诸葛亮舌战群儒 鲁子敬力排众议",
    boss: { name: "鲁肃", courtesy: "字 子敬", description: "诚实君子，力主抗曹，联刘抗曹的关键人物。", visualPrompt: "Lu Su, honest face, official robes, mediating hand gesture" }
  },
  {
    title: "孔明用智激周瑜 孙权决计破曹操",
    boss: { name: "孙权", courtesy: "字 仲谋", description: "拔剑斫案，决计破曹，不复更疑。", visualPrompt: "Sun Quan, purple beard, green eyes, cutting desk with sword, determined" }
  },
  {
    title: "三江口曹操折兵 群英会蒋干中计",
    boss: { name: "蒋干", courtesy: "字 子翼", description: "自作聪明，盗书误事，曹操猪队友。", visualPrompt: "Jiang Gan, scholar, sneaking pose, holding stolen letter, silly face" }
  },
  {
    title: "用奇谋孔明借箭 献密计黄盖受刑",
    boss: { name: "黄盖", courtesy: "字 公覆", description: "周瑜打黄盖，一个愿打一个愿挨，苦肉计诈降。", visualPrompt: "Huang Gai, old general, bare back, injured, determined expression" }
  },
  {
    title: "阚泽密献诈降书 庞统巧授连环计",
    boss: { name: "庞统", courtesy: "号 凤雏", description: "巧授连环计，把曹操战船锁在一起，为火攻铺路。", visualPrompt: "Pang Tong, ugly face, bushy eyebrows, simple robes, holding chain links" }
  },
  {
    title: "宴长江曹操赋诗 锁战船北军用武",
    boss: { name: "曹操", courtesy: "字 孟德", description: "横槊赋诗，对酒当歌，人生几何，醉意狂妄。", visualPrompt: "Cao Cao, drunk, holding spear (lance), full moon background, poetry mood" }
  },
  {
    title: "七星坛诸葛祭风 三江口周瑜纵火",
    boss: { name: "周瑜", courtesy: "字 公瑾", description: "羽扇纶巾，谈笑间，樯橹灰飞烟灭。", visualPrompt: "Zhou Yu, handsome, armor, commanding fire ships, confident" }
  },
  {
    title: "诸葛亮智算华容 关云长义释曹操",
    boss: { name: "关羽", courtesy: "字 云长", description: "华容道义释曹操，全了昔日恩情。", visualPrompt: "Guan Yu, green robes, holding guandao, blocking path, conflicted face" }
  },
  {
    title: "曹仁大战东吴兵 孔明一气周公瑾",
    boss: { name: "曹仁", courtesy: "字 子孝", description: "死守南郡，诈败诱敌，射伤周瑜。", visualPrompt: "Cao Ren, defensive stance, heavy shield, wall background" }
  },
  {
    title: "诸葛亮智辞鲁肃 赵子龙计取桂阳",
    boss: { name: "赵云", courtesy: "字 子龙", description: "计取桂阳，拒娶樊氏，一身正气。", visualPrompt: "Zhao Yun, handsome general, refusing marriage proposal, stern" }
  },
  {
    title: "关云长义释黄汉升 孙仲谋大战张文远",
    boss: { name: "黄忠", courtesy: "字 汉升", description: "百步穿杨，老当益壮，长沙之战义释关羽。", visualPrompt: "Huang Zhong, old general, white beard, drawing bow fully" }
  },
  {
    title: "吴国太佛寺看新郎 刘皇叔洞房续佳偶",
    boss: { name: "孙尚香", courtesy: "枭姬", description: "身带利器，才捷刚猛，刘皇叔的强悍新娘。", visualPrompt: "Sun Shangxiang, red wedding dress but with sword on back, beautiful and fierce" }
  },
  {
    title: "玄德智激孙夫人 孔明二气周公瑾",
    boss: { name: "刘备", courtesy: "字 玄德", description: "英雄气短，儿女情长，险些乐不思荆。", visualPrompt: "Liu Bei, fancy wu robes, looking worried, escaping" }
  },
  {
    title: "曹操大宴铜雀台 孔明三气周公瑾",
    boss: { name: "曹操", courtesy: "字 孟德", description: "铜雀台大宴，锦袍悬柳，极尽奢华。", visualPrompt: "Cao Cao, high platform, holding red robe, watching archery" }
  },
  {
    title: "柴桑口卧龙吊丧 耒阳县凤雏理事",
    boss: { name: "庞统", courtesy: "号 凤雏", description: "耒阳理事，百日公务半日了，大才小用。", visualPrompt: "Pang Tong, magistrate desk, piles of paper, handling them quickly, bored" }
  },
  {
    title: "马孟起兴兵雪恨 曹阿瞒割须弃袍",
    boss: { name: "马超", courtesy: "字 孟起", description: "锦马超，杀得曹操割须弃袍，威震潼关。", visualPrompt: "Ma Chao, silver armor, white lion helmet, chasing, fierce" }
  },
  {
    title: "许褚裸衣斗马超 曹操抹书间韩遂",
    boss: { name: "许褚", courtesy: "虎痴", description: "裸衣斗马超，虎痴神力，单挑西凉锦马超。", visualPrompt: "Xu Chu, shirtless, muscular, holding big sword, sweating, fighting" }
  },
  {
    title: "张永年反难杨修 庞士元议取西川",
    boss: { name: "张松", courtesy: "字 永年", description: "过目不忘，献西川地图，却因貌丑遭慢待。", visualPrompt: "Zhang Song, ugly, short, holding map, smart eyes" }
  },
  {
    title: "赵云截江夺阿斗 孙权遗书退老瞒",
    boss: { name: "赵云", courtesy: "字 子龙", description: "截江夺斗，勒马横舟，再救幼主。", visualPrompt: "Zhao Yun, on boat, blocking another boat, holding sword, heroic" }
  },
  {
    title: "取涪关杨高授首 攻雒城黄魏争功",
    boss: { name: "魏延", courtesy: "字 文长", description: "争功冒进，舞刀弄险，性格缺陷初显。", visualPrompt: "Wei Yan, red face mask (opera style hint), aggressive, holding sword" }
  },
  {
    title: "诸葛亮痛哭庞统 张翼德义释严颜",
    boss: { name: "张任", courtesy: "蜀中名将", description: "落凤坡埋伏，射杀庞统，忠义死节。", visualPrompt: "Zhang Ren, ambush, bow and arrow, mountain path background, loyal face" }
  },
  {
    title: "孔明定计捉张任 杨阜借兵破马超",
    boss: { name: "马超", courtesy: "字 孟起", description: "被杨阜算计，虽勇无谋，败走西凉。", visualPrompt: "Ma Chao, defeated, disheveled, bloody, riding away" }
  },
  {
    title: "马超大战葭萌关 刘备自领益州牧",
    boss: { name: "马岱", courtesy: "西凉将", description: "随兄征战，诈败诱敌，暗箭射张飞。", visualPrompt: "Ma Dai, younger general, western armor, turning back to shoot arrow" }
  },
  {
    title: "关云长单刀赴会 伏皇后为国捐生",
    boss: { name: "伏皇后", courtesy: "汉献帝后", description: "密谋除贼，事败被杀，汉室更加衰微。", visualPrompt: "Empress Fu, royal dress, crying, being dragged away, tragic" }
  },
  {
    title: "曹操平定汉中地 张辽威震逍遥津",
    boss: { name: "张辽", courtesy: "字 文远", description: "威震逍遥津，八百破十万，止啼江东。", visualPrompt: "Zhang Liao, dual axes/halberds, charging, aura of fear, godlike" }
  },
  {
    title: "甘宁百骑劫魏营 左慈掷杯戏曹操",
    boss: { name: "左慈", courtesy: "乌角先生", description: "掷杯戏曹，化身飞鹤，戏弄权贵。", visualPrompt: "Zuo Ci, old immortal, one eye, magic illusions, crane background" }
  },
  {
    title: "卜周易管辂知机 讨汉贼五臣死节",
    boss: { name: "管辂", courtesy: "神卜", description: "精通周易，预言鲁肃之死与许昌大火。", visualPrompt: "Guan Lu, young fortune teller, holding tortoise shell/coins, mysterious" }
  },
  {
    title: "猛张飞智取瓦口隘 老黄忠计夺天荡山",
    boss: { name: "张合", courtesy: "字 儁乂", description: "魏国名将，却被张飞瓦口隘喝醉酒戏耍。", visualPrompt: "Zhang He, elegant general, confused, mountain pass background" }
  },
  {
    title: "占对山黄忠逸待劳 据汉水赵云寡胜众",
    boss: { name: "黄忠", courtesy: "字 汉升", description: "定军山，刀劈夏侯渊，老将巅峰。", visualPrompt: "Huang Zhong, raising sword high, cutting down enemy, mountain peak" }
  },
  {
    title: "诸葛亮智取汉中 曹阿瞒兵退斜谷",
    boss: { name: "杨修", courtesy: "字 德祖", description: "鸡肋鸡肋，食之无味弃之可惜，恃才放旷招致杀身。", visualPrompt: "Yang Xiu, smart scholar, holding chicken rib, arrogant smile" }
  },
  {
    title: "刘玄德进位汉中王 关云长水淹七军",
    boss: { name: "刘备", courtesy: "汉中王", description: "进位汉中王，封五虎上将，大业顶峰。", visualPrompt: "Liu Bei, King's crown, ceremonial robes, holding seal, majestic" }
  },
  {
    title: "关云长刮骨疗毒 吕子明白衣渡江",
    boss: { name: "庞德", courtesy: "字 令明", description: "抬棺死战，射中关羽前额，虽败犹荣。", visualPrompt: "Pang De, sitting on coffin, holding bow, determined to die" }
  },
  {
    title: "关云长刮骨疗毒 吕子明白衣渡江",
    boss: { name: "华佗", courtesy: "神医", description: "刮骨疗毒，谈笑自若，神乎其技。", visualPrompt: "Hua Tuo, surgeon tools, scraping bone sound visualization, calm" }
  },
  {
    title: "徐公明大战沔水 关云长败走麦城",
    boss: { name: "徐晃", courtesy: "字 公明", description: "长驱直入，大战关羽，公事公办。", visualPrompt: "Xu Huang, heavy battle axe, disciplined, fighting Guan Yu" }
  },
  {
    title: "玉泉山关公显圣 洛阳城曹操感神",
    boss: { name: "吕蒙", courtesy: "字 子明", description: "白衣渡江，袭取荆州，却被关羽魂魄索命。", visualPrompt: "Lu Meng, white merchant clothes hiding armor, sickly/possessed look" }
  },
  {
    title: "治风疾神医身死 传遗命奸雄数终",
    boss: { name: "曹操", courtesy: "魏王", description: "一代奸雄，分香卖履，终归尘土。", visualPrompt: "Cao Cao (Old), dying on bed, surrounded by shadows, legendary end" }
  },
  {
    title: "曹丕废帝篡炎刘 汉王正位继大统",
    boss: { name: "曹丕", courtesy: "字 子桓", description: "逼迫献帝禅让，建立大魏，七步成诗。", visualPrompt: "Cao Pi, Emperor robes, cold expression, holding jade seal" }
  },
  {
    title: "急兄仇张飞遇害 雪弟恨先主兴兵",
    boss: { name: "汉献帝", courtesy: "刘协", description: "山阳公，亡国之君，悲凉禅位。", visualPrompt: "Emperor Xian, simple clothes, looking back at palace, crying" }
  },
  {
    title: "急兄仇张飞遇害 雪弟恨先主兴兵",
    boss: { name: "张飞", courtesy: "字 翼德", description: "醉酒鞭挞士卒，梦中遇刺，身首异处。", visualPrompt: "Zhang Fei, sleeping/drunk, open eyes (as legend says), tragic end" }
  },
  {
    title: "孙权降魏受九锡 先主征吴赏六军",
    boss: { name: "孙权", courtesy: "吴王", description: "忍辱负重，向魏称臣，只为全力抗刘。", visualPrompt: "Sun Quan, King robes, bowing slightly but eyes looking up/scheming" }
  },
  {
    title: "战猇亭先主得仇人 守江口书生拜大将",
    boss: { name: "沙摩柯", courtesy: "蛮王", description: "五溪蛮王，助刘伐吴，射死甘宁。", visualPrompt: "Shamoke, tribal warrior, face paint, spiked mace weapon" }
  },
  {
    title: "陆逊营烧七百里 孔明巧布八阵图",
    boss: { name: "陆逊", courtesy: "字 伯言", description: "书生拜大将，火烧连营七百里，一战成名。", visualPrompt: "Lu Xun, young scholar general, holding torch, fire background" }
  },
  {
    title: "刘先主遗诏托孤儿 诸葛亮安居平五路",
    boss: { name: "刘备", courtesy: "昭烈帝", description: "白帝托孤，君臣之遇，千古绝唱。", visualPrompt: "Liu Bei (Old), sick bed, holding Zhuge Liang's hand, tearful" }
  },
  {
    title: "难张温秦宓逞天辩 破曹丕徐盛用火攻",
    boss: { name: "秦宓", courtesy: "字 子敕", description: "天辩难倒张温，蜀中多才俊。", visualPrompt: "Qin Mi, scholar, debating gesture, confident smile" }
  },
  {
    title: "征南寇丞相大兴师 抗天兵蛮王初受执",
    boss: { name: "孟获", courtesy: "南蛮王", description: "南蛮之王，起兵反蜀，第一次被擒。", visualPrompt: "Meng Huo, large, animal skins, angry, tied up" }
  },
  {
    title: "渡卢水再缚番王 识诈降三擒孟获",
    boss: { name: "祝融夫人", courtesy: "火神后裔", description: "飞刀绝技，生擒张飞之子，巾帼不让须眉。", visualPrompt: "Lady Zhurong, exotic warrior dress, throwing knives, fierce" }
  },
  {
    title: "武乡侯四番用计 南蛮王五次遭擒",
    boss: { name: "木鹿大王", courtesy: "八纳洞主", description: "驱赶虎豹豺狼，骑白象，法术高强。", visualPrompt: "Mulu King, riding white elephant, ringing bell, animals around" }
  },
  {
    title: "驱巨兽六破蛮兵 烧藤甲七擒孟获",
    boss: { name: "兀突骨", courtesy: "乌戈国主", description: "藤甲军刀枪不入，终被火攻烧尽。", visualPrompt: "Wutugu, giant, rattan armor, scales, holding big club" }
  },
  {
    title: "祭泸水汉相班师 伐中原武侯上表",
    boss: { name: "诸葛亮", courtesy: "字 孔明", description: "出师表，鞠躬尽瘁，死而后已。", visualPrompt: "Zhuge Liang, writing scroll (Chu Shi Biao), sad but determined, candle light" }
  },
  {
    title: "赵子龙力斩五将 诸葛亮智取三城",
    boss: { name: "赵云", courtesy: "常胜将军", description: "年过七旬，力斩五将，不减当年之勇。", visualPrompt: "Zhao Yun (Old), white hair/beard, still holding spear, heroic pose" }
  },
  {
    title: "姜伯约归降孔明 武乡侯骂死王朗",
    boss: { name: "姜维", courtesy: "字 伯约", description: "天水麒麟儿，识破孔明计策，终遇明主。", visualPrompt: "Jiang Wei (Young), silver spear, looking at Zhuge Liang, passing the torch" }
  },
  {
    title: "诸葛亮乘雪破羌兵 司马懿克日擒孟达",
    boss: { name: "王朗", courtesy: "字 景兴", description: "阵前饶舌，被孔明骂死于马下。", visualPrompt: "Wang Lang, white beard old official, clutching chest, falling from horse" }
  },
  {
    title: "马谡拒谏失街亭 武侯弹琴退仲达",
    boss: { name: "马谡", courtesy: "字 幼常", description: "纸上谈兵，痛失街亭，致使北伐功亏一篑。", visualPrompt: "Ma Su, camping on mountain top, looking panicked, surrounded" }
  },
  {
    title: "孔明挥泪斩马谡 周鲂断发赚曹休",
    boss: { name: "周鲂", courtesy: "字 子鱼", description: "断发诈降，诱敌深入，大破曹休。", visualPrompt: "Zhou Fang, cutting hair with sword, deceitful look" }
  },
  {
    title: "讨魏国武侯再上表 破曹兵姜维诈献书",
    boss: { name: "郝昭", courtesy: "字 伯道", description: "陈仓坚守，孔明攻之不下，魏国硬骨头。", visualPrompt: "Hao Zhao, defending city wall, fire arrows, steadfast" }
  },
  {
    title: "追汉军王双受诛 袭陈仓武侯取胜",
    boss: { name: "王双", courtesy: "字 子全", description: "使六十斤大刀，暗藏流星锤，勇不可挡。", visualPrompt: "Wang Shuang, huge general, meteor hammer, scar face" }
  },
  {
    title: "诸葛亮大破魏兵 司马懿入寇西蜀",
    boss: { name: "孙权", courtesy: "吴大帝", description: "登基称帝，三国鼎立局面正式形成。", visualPrompt: "Sun Quan, Emperor, golden robes, jade beads, sitting on throne" }
  },
  {
    title: "汉兵劫寨破曹真 武侯斗阵辱仲达",
    boss: { name: "曹真", courtesy: "字 子丹", description: "魏国大都督，与孔明斗阵失败，郁闷而终。", visualPrompt: "Cao Zhen, General, looking frustrated, looking at formation map" }
  },
  {
    title: "出陇上诸葛妆神 奔剑阁张赫受计",
    boss: { name: "诸葛亮", courtesy: "妆神", description: "鬼神莫测，陇上割麦，四轮车吓退司马懿。", visualPrompt: "Zhuge Liang, on carriage, mystery fog, fan covering face, god-like" }
  },
  {
    title: "司马懿占北原渭桥 诸葛亮造木牛流马",
    boss: { name: "张合", courtesy: "字 儁乂", description: "木门道中伏，一代名将，死于乱箭之下。", visualPrompt: "Zhang He, kneeled, arrows stuck in armor, tragic end" }
  },
  {
    title: "上方谷司马受困 五丈原诸葛禳星",
    boss: { name: "司马懿", courtesy: "字 仲达", description: "上方谷遇雨，天不亡曹，父子三人死里逃生。", visualPrompt: "Sima Yi, hugging two sons, rain falling, scorched armor, laughing/crying" }
  },
  {
    title: "陨大星汉丞相归天 见木像魏都督丧胆",
    boss: { name: "诸葛亮", courtesy: "武侯", description: "秋风五丈原，星落秋风，死诸葛吓走生仲达。", visualPrompt: "Zhuge Liang (Spirit), translucent/glowing, overlooking army" }
  },
  {
    title: "武侯遗计斩魏延 曹叡拆盘熬甘露",
    boss: { name: "魏延", courtesy: "字 文长", description: "谁敢杀我？脑后反骨，终被马岱所斩。", visualPrompt: "Wei Yan, shouting arrogantly, sword raised, unaware of danger behind" }
  },
  {
    title: "曹叡病危托司马 曹爽专权废郭太",
    boss: { name: "公孙渊", courtesy: "辽东王", description: "辽东反叛，自立为王，被司马懿速推。", visualPrompt: "Gongsun Yuan, fur hat, snowy background, rebellious" }
  },
  {
    title: "曹叡病危托司马 曹爽专权废郭太",
    boss: { name: "曹爽", courtesy: "字 昭伯", description: "托孤重臣，却专权乱政，最终为司马懿所乘。", visualPrompt: "Cao Shuang, fancy clothes, playing/hunting, oblivious to danger" }
  },
  {
    title: "司马懿诈病赚曹爽 曹文叔大笑还朝",
    boss: { name: "司马懿", courtesy: "宣帝", description: "高平陵政变，诈病夺权，三马同槽。", visualPrompt: "Sima Yi, very old, white hair, sharp evil eyes, holding sword" }
  },
  {
    title: "姜维兵败牛头山 郭淮中计洮西水",
    boss: { name: "夏侯霸", courtesy: "字 仲权", description: "惧怕司马氏迫害，投奔蜀汉，成为姜维助力。", visualPrompt: "Xiahou Ba, defects, mixing Wei and Shu armor components" }
  },
  {
    title: "丁奉雪中奋短兵 孙峻席间施密计",
    boss: { name: "文鸯", courtesy: "字 次骞", description: "单骑退雄兵，勇冠三军，小赵云。", visualPrompt: "Wen Yang, young, silver armor, whipping horse, surrounded by enemies" }
  },
  {
    title: "困司马汉将奇谋 废曹芳魏家果报",
    boss: { name: "邓艾", courtesy: "字 士载", description: "屯田避祸，老成持重，姜维的一生之敌。", visualPrompt: "Deng Ai, examining map/terrain, stuttering expression (mouth open), smart" }
  },
  {
    title: "文鸯单骑退雄兵 姜维背水破大敌",
    boss: { name: "诸葛诞", courtesy: "字 公休", description: "淮南三叛，义讨司马昭，兵败身亡。", visualPrompt: "Zhuge Dan, holding banner of righteousness, rain, desperate defense" }
  },
  {
    title: "邓士载智败姜伯约 诸葛诞义讨司马昭",
    boss: { name: "于诠", courtesy: "东吴猛将", description: "乃大丈夫也，不愿降魏，脱盔战死。", visualPrompt: "Yu Quan, removing helmet, charging into enemy, heroic death" }
  },
  {
    title: "救寿春于诠死节 取长城伯约鏖兵",
    boss: { name: "曹髦", courtesy: "高贵乡公", description: "司马昭之心路人皆知，驱车死战，血溅南阙。", visualPrompt: "Cao Mao, young Emperor, holding sword, driving carriage, angry" }
  },
  {
    title: "丁奉定计斩孙綝 姜维斗阵破邓艾",
    boss: { name: "姜维", courtesy: "字 伯约", description: "沓中避祸，苦撑危局，九伐中原心未冷。", visualPrompt: "Jiang Wei, older, worn armor, looking at setting sun, determined" }
  },
  {
    title: "曹髦驱车死南阙 姜维弃粮胜魏兵",
    boss: { name: "钟会", courtesy: "字 士季", description: "伐蜀主帅，野心勃勃，欲效法刘备自立。", visualPrompt: "Zhong Hui, ambitious, holding geographical map of Shu, smirk" }
  },
  {
    title: "诏班师后主信谗 托屯田姜维避祸",
    boss: { name: "诸葛瞻", courtesy: "字 思远", description: "绵竹战死，满门忠烈，不负武侯之名。", visualPrompt: "Zhuge Zhan, crying, holding father's fan, facing overwhelming army" }
  },
  {
    title: "钟会分兵汉中道 武侯显圣定军山",
    boss: { name: "刘禅", courtesy: "阿斗", description: "乐不思蜀，亡国之君，安乐公。", visualPrompt: "Liu Shan, happy/clueless face, holding wine, surrender flag behind" }
  },
  {
    title: "邓士载偷度阴平 诸葛瞻战死绵竹",
    boss: { name: "司马昭", courtesy: "字 子上", description: "路人皆知，灭蜀受禅，晋朝奠基人。", visualPrompt: "Sima Zhao, watching map of unification, powerful, ruthless" }
  },
  {
    title: "哭祖庙一王死孝 入西川二士争功",
    boss: { name: "杜预", courtesy: "字 元凯", description: "破竹之势，灭吴统帅，武库。", visualPrompt: "Du Yu, scholar general, pointing south (Wu), confident" }
  }
];

// Helper to safely get chapter data
export const getChapterData = (chapter: number): ChapterData => {
  // Arrays are 0-indexed, chapters are 1-indexed
  // Fallback for safety, though DATA should cover all 120
  const index = chapter - 1;
  if (DATA[index]) {
    return DATA[index];
  }
  
  // Fallback mock data if index out of bounds
  return {
    title: `第 ${chapter} 回`,
    boss: {
      name: "未知武将",
      courtesy: "无名",
      description: "乱世之中的无名过客。",
      visualPrompt: DEFAULT_BOSS_VISUAL
    }
  };
}

export const getChapterTitle = (chapter: number) => {
    return getChapterData(chapter).title;
}