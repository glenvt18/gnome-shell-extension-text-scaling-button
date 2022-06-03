NAME = Text scaling button. GNOME shell extension
VERSION = 1.0
EMAIL = glevt18@gmail.com

all:	build install

build:
	gnome-extensions pack -f . --out-dir=./

install:
	gnome-extensions install --force ./textscalingbutton@glenvt18.shell-extension.zip

clean:
	rm textscalingbutton@glenvt18.shell-extension.zip

POT = po/text-scaling-button-extension.pot

i18n: $(wildcard po/*.po)

%.po: $(POT)
	msgmerge --update --backup=none $@ $<

$(POT): $(wildcard *.js)
	xgettext --from-code=UTF-8 --output=$(POT) \
		--package-name='$(NAME)' \
		--package-version=$(VERSION) \
		--msgid-bugs-address=$(EMAIL) \
		$^
