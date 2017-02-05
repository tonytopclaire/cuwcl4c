import { BeginWith, Contains, EndWith } from "../helper/Extension";
import { WaitUntil } from "../helper/Wait";
import { RedirectTo, phpdiskAutoRedirect } from "../helper/Redirect";
import { Script } from "../helper/Script";
import { ISiteRule } from "../SiteRule";

import { } from "../typings/GM_Unsafe.d";
import { } from "../typings/Userscript.d";
/// <reference path="../typings/globals/jquery/index.d.ts" />

var phpdiskA: ISiteRule = {
	id: 'phpdisk.a',
	name: 'PHPDisk A 类网赚网盘',
	host: [
		'79pan.com', '03xg.com',
        '7mv.cc', 'pan.52zz.org',
        '258pan.com', 'huimeiku.com'
    ],

	hide: '#code_box, #down_box2, #codefrm, .ad, [class^="banner"]',
	show: '#down_box',

	includeSubHost: false,
    subModule: false,

	onStart: () => {
		unsafeOverwriteFunctionSafeProxy ({
			open: url => null
		});
	},

    onBody: () => {
        var self = this;
        WaitUntil('down_file_link', () => {
            var ctx: any = unsafeWindow;
			// 避免地址被覆盖
			ctx.update_sec = null;
			// 强制显示地址
			ctx.down_file_link ();

			// 强制显示下载地址
			if (ctx.show_down_url)
				ctx.show_down_url('down_a1');

			var jumpUrl = $('#down_link').find('a').attr('href');

			// 然后跳过去
			if (jumpUrl) {
                RedirectTo (jumpUrl);
			} else {
				alert (`[${Script.Name}]: 应用 ${self.name} 失败:\n找不到跳转地址.`);
			}
        });
    }
};

var phpdiskZ: ISiteRule = {
	id: 'phpdisk.z',
	name: '通用 phpDisk.z 网盘规则',
	// 规则: 直接跳转 /file-xxx -> /down-xxx
	//       并隐藏 down_box2, 显示 down_box

	host: [
		'wpan.cc', 'ypan.cc',
		'azpan.com', 'gxdisk.com', '2kuai.com', '1wp.me', 
		'77pan.cc', 'vvpan.com', 'fmdisk.com', 'bx0635.com',
		'10pan.cc', '1pan.cc', '123wzwp.com', 'wwp5.com',
		'fydisk.com'
	],

	hide: `.Downpagebox, .talk_show, .banner_2, .w_305, .ad,
           #vcode, #tui, .dcode, #down_box2, #dl_tips, .nal,
           .scbar_hot_td, #incode`,

	show: '#down_box, #dl_addr',

	includeSubHost: false,
    subModule: false,

	onStart: () => {
		unsafeOverwriteFunctionSafeProxy ({
			down_process: unknown => null
		});
		phpdiskAutoRedirect(null);
	},

    onBody: () => {
    }
};

export var Rules: ISiteRule[] = [phpdiskA, phpdiskA];