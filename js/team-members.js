/**
  * @desc builds a sequence of members per row for better view
  * @param int totalMembers - the total number of team members for the table
  * @return [int] - array with the numbers of members per row that should be used
*/
function rowsSequenceFor(totalMembers) {
	var rowsSequence = [];
	var unorganizedMembers = totalMembers;
	while (unorganizedMembers > 0) {
		if (unorganizedMembers > 9) {
            rowsSequence.push(4);
            unorganizedMembers -= 4;
        } else if ((unorganizedMembers % 4 == 0) || (unorganizedMembers % 4 == 3)) {
			if (unorganizedMembers == 3) {
				rowsSequence.push(3);
				unorganizedMembers -= 3;
			} else {
				rowsSequence.push(4);
				unorganizedMembers -= 4;
			}
		} else {
			if (unorganizedMembers == 2) {
				rowsSequence.push(2);
				unorganizedMembers -= 2;
			} else {
				rowsSequence.push(3);
				unorganizedMembers -= 3;
			}
		}
	}
	return rowsSequence;
}

/**
  * @desc writes in the document the table of team members
  * @param [members] - array with members, where each member is [name, image.ext, degree, userUrl]
*/
function createTeamMembers(membersArray) {

	const defaultAvatar = "team-avatar.png";

	const n2membersRowClass = "w-row container shorter2";
	const n3membersRowClass = "w-row container shorter";
	const n4membersRowClass = "w-row container short";

	const n2membersColClass = "w-col w-col-6 w-col-small-6";
	const n3membersColClass = "w-col w-col-4 w-col-small-4";
	const n4membersColClass = "w-col w-col-3 w-col-small-3";

	const avatarClassArray = ["avatar", "avatar border-color-1", "avatar border-color-2", "avatar border-color-3", "avatar border-color-4"]
	const totalAvatars = avatarClassArray.length;

	const rowsSequence = rowsSequenceFor(membersArray.length);

	var memberTableIndex = 0;
	var finalTeamMembers = '';

	for (var i = 0; i < rowsSequence.length; i++) {
		var totalMembersRow = rowsSequence[i];
		var membersRowClass;
		var membersColClass;

		switch (totalMembersRow) {
			case 2:
				membersRowClass = n2membersRowClass;
				membersColClass = n2membersColClass;
				break;
			case 3:
				membersRowClass = n3membersRowClass;
				membersColClass = n3membersColClass;
				break;
			case 4:
				membersRowClass = n4membersRowClass;
				membersColClass = n4membersColClass;
				break;
		}

		finalTeamMembers += '<div class="separator-div"></div>'
		finalTeamMembers += '<div class="' + membersRowClass + '">'

		// each member: [name, image.ext, degree, linkedInUser, role]

		for (var j = 0; j < totalMembersRow; j++) {
			var member = membersArray[memberTableIndex]

			finalTeamMembers += '<div class="' + membersColClass + '">'
    	    if (member[3]) finalTeamMembers += '<a href="' + member[3] + '" target="_blank">'
    	    	finalTeamMembers += '<img src="images/members/' + (member[1] || defaultAvatar) + '" class="' + avatarClassArray[memberTableIndex%totalAvatars] + '">'
    	    if (member[3]) finalTeamMembers += '</a>'
    	    finalTeamMembers += '<h4 class="subheading-font">' + member[0] + '</h4>'
    	    finalTeamMembers += '<p class="description">' + member[2] + '</p>'
					finalTeamMembers += '<h5>' + "Área: " + (member[4] || "-") + '</h5>'
			finalTeamMembers += '</div>'
			memberTableIndex++;
		}

		finalTeamMembers += '</div>'
	}

	document.write(finalTeamMembers)
}
