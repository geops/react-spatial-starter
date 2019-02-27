#!/bin/bash
if rm -rf build/es; then
    # Compile the 'src' directory and output it to the 'build/es' directory
    if NODE_ENV=production babel src --config-file './packages/es/.babelrc' --out-dir build/es --source-maps --copy-files; then
        # Remove test files and their sourcemaps
        if find build/es -regextype posix-extended -regex '.*(test).*js.?(map|snap)?$' -type f | xargs rm -f; then
            # Remove snapshots folders
            if find build/es -name '__snapshots__' -type d | xargs rm -rf; then
                # Copy to the 'build/es' target
                cp -r packages/es/* build/es
            else
                echo "Remove snapshots folders failed."
            fi
        else
            echo "Remove test files and their sourcemaps failed."
        fi
    else
        echo "Compile the 'src' directory failed."
    fi
else
    echo "Empty build/es folder failed."
fi
