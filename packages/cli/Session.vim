let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Code/oasis/packages/cli
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +61 test/fetchPost.test.ts
badd +47 term://~/Code/oasis/packages/cli//469272:/usr/bin/fish
badd +9 test/post.test.ts
badd +13 src/commands/post.ts
badd +1 src/index.ts
badd +17 term://~/Code/oasis/packages/cli//534301:/usr/bin/fish
badd +6 babel.config.js
badd +8 src/commands/fetchPosts.ts
badd +1 ~/Code/oasis/packages/shared/src/lib/constants.ts
badd +32 package.json
badd +3 test/helper.ts
badd +1 ~/Code/oasis/packages/cli
badd +14 test/schemas/postSchema.json
badd +13 tsconfig.json
badd +1 jest.config.ts
badd +6 test/schemas/postSchema.ts
badd +6 term://~/Code/oasis/packages/cli//1078295:/usr/bin/fish
badd +1 ~/Code/oasis/packages/sdk/src/constants.ts
badd +19 ~/Code/oasis/packages/sdk/src/base-client.ts
argglobal
%argdel
$argadd ~/Code/oasis/packages/cli
tabnew
tabrewind
edit test/fetchPost.test.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
split
1wincmd k
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
2wincmd h
wincmd w
wincmd w
wincmd w
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
wincmd =
argglobal
balt src/commands/post.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 19 - ((10 * winheight(0) + 11) / 23)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 19
normal! 036|
wincmd w
argglobal
if bufexists("term://~/Code/oasis/packages/cli//1078295:/usr/bin/fish") | buffer term://~/Code/oasis/packages/cli//1078295:/usr/bin/fish | else | edit term://~/Code/oasis/packages/cli//1078295:/usr/bin/fish | endif
if &buftype ==# 'terminal'
  silent file term://~/Code/oasis/packages/cli//1078295:/usr/bin/fish
endif
balt test/schemas/postSchema.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 708 - ((22 * winheight(0) + 11) / 23)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 708
normal! 0
wincmd w
argglobal
if bufexists("test/helper.ts") | buffer test/helper.ts | else | edit test/helper.ts | endif
if &buftype ==# 'terminal'
  silent file test/helper.ts
endif
balt ~/Code/oasis/packages/sdk/src/base-client.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 6 - ((5 * winheight(0) + 11) / 23)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 6
normal! 0
wincmd w
argglobal
if bufexists("src/commands/fetchPosts.ts") | buffer src/commands/fetchPosts.ts | else | edit src/commands/fetchPosts.ts | endif
if &buftype ==# 'terminal'
  silent file src/commands/fetchPosts.ts
endif
balt src/index.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 10 - ((9 * winheight(0) + 11) / 23)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 10
normal! 0
wincmd w
argglobal
if bufexists("jest.config.ts") | buffer jest.config.ts | else | edit jest.config.ts | endif
if &buftype ==# 'terminal'
  silent file jest.config.ts
endif
balt tsconfig.json
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 80 - ((3 * winheight(0) + 11) / 23)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 80
normal! 0112|
wincmd w
2wincmd w
wincmd =
tabnext
argglobal
if bufexists("term://~/Code/oasis/packages/cli//469272:/usr/bin/fish") | buffer term://~/Code/oasis/packages/cli//469272:/usr/bin/fish | else | edit term://~/Code/oasis/packages/cli//469272:/usr/bin/fish | endif
if &buftype ==# 'terminal'
  silent file term://~/Code/oasis/packages/cli//469272:/usr/bin/fish
endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 47 - ((46 * winheight(0) + 23) / 47)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 47
normal! 0
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0&& getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOFA
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
let g:this_session = v:this_session
let g:this_obsession = v:this_session
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
