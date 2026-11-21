#!/bin/sh
# Xcode Cloud clones the repo without Undirect.xcodeproj (it is generated from
# project.yml and gitignored), so generate it before Xcode Cloud resolves the
# project. Xcode Cloud sets the build number itself on archive.
set -e
brew install xcodegen
cd "$CI_PRIMARY_REPOSITORY_PATH"
xcodegen generate
