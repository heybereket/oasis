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
badd +11 src/commands/get_current_user.ts
badd +13 src/commands/create_post.ts
badd +12 src/index.ts
badd +1 term://~/Code/oasis/packages/cli//96184:/bin/fish
badd +13 ~/Code/oasis/packages/cli/src/commands/get_user_by_name.ts
badd +9 ~/Code/oasis/packages/cli/src/commands/get_my_user_id.ts
badd +1 ~/Code/oasis/packages/cli/src/commands/get_users_upvoted_posts.ts
badd +4 ~/Code/oasis/packages/cli/src/commands/get_users_posts
badd +30 ~/Code/oasis/packages/cli/src/commands/get_users_posts.ts
badd +9 ~/Code/oasis/packages/cli/src/commands/search.ts
badd +22 ~/Code/oasis/packages/cli/src/commands/follow_user.ts
badd +35 ~/Code/oasis/packages/cli/src/commands/update_profile.ts
badd +12 ~/Code/oasis/packages/cli/src/commands/delete_account.ts
badd +478 term://~/Code/oasis/packages/cli//253961:/bin/fish
badd +0 term://~/Code/oasis/packages/cli//275496:/bin/fish
badd +28 ~/Code/oasis/packages/cli/jest.config.ts
badd +3 ~/Code/oasis/packages/cli/test/create_post.test.ts
badd +9 ~/Code/oasis/packages/cli/babel.config.js
badd +5 ~/Code/oasis/packages/cli/test/fetch_post.test.ts
badd +29 ~/Code/oasis/packages/cli/src/commands/fetch_post.ts
badd +4 ~/Code/oasis/packages/cli/test/follow_user.test.ts
badd +8 ~/Code/oasis/packages/cli/test/update_profile.test.ts
badd +3 ~/Code/oasis/packages/cli/test/get_current_user.test.ts
badd +4 ~/Code/oasis/packages/cli/test/get_my_user_id.test.ts
badd +4 ~/Code/oasis/packages/cli/test/search.test.ts
badd +4 ~/Code/oasis/packages/cli/test/get_users_upvotes_posts.test.ts
badd +1 ~/Code/oasis/packages/cli/test/get_user_by_name.test.ts
badd +4 ~/Code/oasis/packages/cli/test/get_users_posts.test.ts
argglobal
%argdel
$argadd ./
tabnew
tabrewind
edit ~/Code/oasis/packages/cli/src/commands/get_users_posts.ts
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
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
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
balt ~/Code/oasis/packages/cli/src/commands/get_user_by_name.ts
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
let s:l = 22 - ((21 * winheight(0) + 15) / 31)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 22
normal! 041|
wincmd w
argglobal
if bufexists("~/Code/oasis/packages/cli/test/fetch_post.test.ts") | buffer ~/Code/oasis/packages/cli/test/fetch_post.test.ts | else | edit ~/Code/oasis/packages/cli/test/fetch_post.test.ts | endif
if &buftype ==# 'terminal'
  silent file ~/Code/oasis/packages/cli/test/fetch_post.test.ts
endif
balt ~/Code/oasis/packages/cli/test/create_post.test.ts
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
let s:l = 4 - ((3 * winheight(0) + 7) / 15)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 4
normal! 0
wincmd w
argglobal
if bufexists("~/Code/oasis/packages/cli/test/get_users_posts.test.ts") | buffer ~/Code/oasis/packages/cli/test/get_users_posts.test.ts | else | edit ~/Code/oasis/packages/cli/test/get_users_posts.test.ts | endif
if &buftype ==# 'terminal'
  silent file ~/Code/oasis/packages/cli/test/get_users_posts.test.ts
endif
balt ~/Code/oasis/packages/cli/test/get_user_by_name.test.ts
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
let s:l = 4 - ((3 * winheight(0) + 7) / 15)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 4
normal! 0
wincmd w
argglobal
if bufexists("term://~/Code/oasis/packages/cli//275496:/bin/fish") | buffer term://~/Code/oasis/packages/cli//275496:/bin/fish | else | edit term://~/Code/oasis/packages/cli//275496:/bin/fish | endif
if &buftype ==# 'terminal'
  silent file term://~/Code/oasis/packages/cli//275496:/bin/fish
endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 451 - ((30 * winheight(0) + 15) / 31)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 451
normal! 0
wincmd w
argglobal
if bufexists("src/index.ts") | buffer src/index.ts | else | edit src/index.ts | endif
if &buftype ==# 'terminal'
  silent file src/index.ts
endif
balt ~/Code/oasis/packages/cli/src/commands/update_profile.ts
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
let s:l = 14 - ((8 * winheight(0) + 7) / 15)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 14
normal! 030|
wincmd w
wincmd =
tabnext
argglobal
if bufexists("term://~/Code/oasis/packages/cli//96184:/bin/fish") | buffer term://~/Code/oasis/packages/cli//96184:/bin/fish | else | edit term://~/Code/oasis/packages/cli//96184:/bin/fish | endif
if &buftype ==# 'terminal'
  silent file term://~/Code/oasis/packages/cli//96184:/bin/fish
endif
balt term://~/Code/oasis/packages/cli//96184:/bin/fish
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 18 - ((17 * winheight(0) + 23) / 47)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 18
normal! 07|
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
