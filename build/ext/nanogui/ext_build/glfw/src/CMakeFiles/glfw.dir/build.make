# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.22

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/local/Cellar/cmake/3.22.1/bin/cmake

# The command to remove a file.
RM = /usr/local/Cellar/cmake/3.22.1/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /Users/natalielkemper/desktop/cs184/projects/cs184-final

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /Users/natalielkemper/desktop/cs184/projects/cs184-final/build

# Include any dependencies generated for this target.
include ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw.dir/compiler_depend.make

# Include the progress variables for this target.
include ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw.dir/progress.make

# Include the compile flags for this target's objects.
include ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw.dir/flags.make

# Object files for target glfw
glfw_OBJECTS =

# External object files for target glfw
glfw_EXTERNAL_OBJECTS = \
"/Users/natalielkemper/desktop/cs184/projects/cs184-final/build/ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/context.c.o" \
"/Users/natalielkemper/desktop/cs184/projects/cs184-final/build/ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/init.c.o" \
"/Users/natalielkemper/desktop/cs184/projects/cs184-final/build/ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/input.c.o" \
"/Users/natalielkemper/desktop/cs184/projects/cs184-final/build/ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/monitor.c.o" \
"/Users/natalielkemper/desktop/cs184/projects/cs184-final/build/ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/vulkan.c.o" \
"/Users/natalielkemper/desktop/cs184/projects/cs184-final/build/ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/window.c.o" \
"/Users/natalielkemper/desktop/cs184/projects/cs184-final/build/ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/cocoa_init.m.o" \
"/Users/natalielkemper/desktop/cs184/projects/cs184-final/build/ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/cocoa_joystick.m.o" \
"/Users/natalielkemper/desktop/cs184/projects/cs184-final/build/ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/cocoa_monitor.m.o" \
"/Users/natalielkemper/desktop/cs184/projects/cs184-final/build/ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/cocoa_window.m.o" \
"/Users/natalielkemper/desktop/cs184/projects/cs184-final/build/ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/cocoa_time.c.o" \
"/Users/natalielkemper/desktop/cs184/projects/cs184-final/build/ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/posix_tls.c.o" \
"/Users/natalielkemper/desktop/cs184/projects/cs184-final/build/ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/nsgl_context.m.o"

ext/nanogui/ext_build/glfw/src/libglfw.dylib: ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/context.c.o
ext/nanogui/ext_build/glfw/src/libglfw.dylib: ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/init.c.o
ext/nanogui/ext_build/glfw/src/libglfw.dylib: ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/input.c.o
ext/nanogui/ext_build/glfw/src/libglfw.dylib: ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/monitor.c.o
ext/nanogui/ext_build/glfw/src/libglfw.dylib: ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/vulkan.c.o
ext/nanogui/ext_build/glfw/src/libglfw.dylib: ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/window.c.o
ext/nanogui/ext_build/glfw/src/libglfw.dylib: ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/cocoa_init.m.o
ext/nanogui/ext_build/glfw/src/libglfw.dylib: ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/cocoa_joystick.m.o
ext/nanogui/ext_build/glfw/src/libglfw.dylib: ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/cocoa_monitor.m.o
ext/nanogui/ext_build/glfw/src/libglfw.dylib: ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/cocoa_window.m.o
ext/nanogui/ext_build/glfw/src/libglfw.dylib: ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/cocoa_time.c.o
ext/nanogui/ext_build/glfw/src/libglfw.dylib: ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/posix_tls.c.o
ext/nanogui/ext_build/glfw/src/libglfw.dylib: ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw_objects.dir/nsgl_context.m.o
ext/nanogui/ext_build/glfw/src/libglfw.dylib: ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw.dir/build.make
ext/nanogui/ext_build/glfw/src/libglfw.dylib: ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/Users/natalielkemper/desktop/cs184/projects/cs184-final/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Linking C shared library libglfw.dylib"
	cd /Users/natalielkemper/desktop/cs184/projects/cs184-final/build/ext/nanogui/ext_build/glfw/src && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/glfw.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw.dir/build: ext/nanogui/ext_build/glfw/src/libglfw.dylib
.PHONY : ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw.dir/build

ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw.dir/clean:
	cd /Users/natalielkemper/desktop/cs184/projects/cs184-final/build/ext/nanogui/ext_build/glfw/src && $(CMAKE_COMMAND) -P CMakeFiles/glfw.dir/cmake_clean.cmake
.PHONY : ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw.dir/clean

ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw.dir/depend:
	cd /Users/natalielkemper/desktop/cs184/projects/cs184-final/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /Users/natalielkemper/desktop/cs184/projects/cs184-final /Users/natalielkemper/desktop/cs184/projects/cs184-final/ext/nanogui/ext/glfw/src /Users/natalielkemper/desktop/cs184/projects/cs184-final/build /Users/natalielkemper/desktop/cs184/projects/cs184-final/build/ext/nanogui/ext_build/glfw/src /Users/natalielkemper/desktop/cs184/projects/cs184-final/build/ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : ext/nanogui/ext_build/glfw/src/CMakeFiles/glfw.dir/depend

