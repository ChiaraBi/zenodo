// This file is part of Zenodo.
// Copyright (C) 2016 CERN.
//
// Zenodo is free software; you can redistribute it
// and/or modify it under the terms of the GNU General Public License as
// published by the Free Software Foundation; either version 2 of the
// License, or (at your option) any later version.
//
// Zenodo is distributed in the hope that it will be
// useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Zenodo; if not, write to the
// Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston,
// MA 02111-1307, USA.
//
// In applying this license, CERN does not
// waive the privileges and immunities granted to it by virtue of its status
// as an Intergovernmental Organization or submit itself to any jurisdiction.

define([], function(){
  function recordCommunityCurate() {
    var endpoint = $(this).attr('endpoint');
    var action = $(this).attr('action');
    var recid = $(this).attr('recid');
    var commId = $(this).attr('commId');
    var data = {recid: recid, action: action};
    var commContainerElemId = "#span-comm-" + commId;
    $.ajax({
      url: endpoint,
      method: "post",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: "json",
      success: function(result, status, xhr) {
        $(commContainerElemId + " > .btn").addClass("disabled");
        $(commContainerElemId + " > .btn").prop("disabled", true);
        var buttonElem = $(commContainerElemId + " > .btn-" + action);
        buttonElem.removeClass("btn-info");
        if (action == "accept") {
          $(commContainerElemId + " > .btn").addClass('hidden');
          $(commContainerElemId + " > div").addClass('text-success').removeClass('hidden')
            .html('<i class="fa fa-check"></i> Accepted');
        } else if (action == "reject") {
          $(commContainerElemId + " > .btn").addClass("hidden");
          $(commContainerElemId + " > div").addClass('text-success').removeClass('hidden')
            .html('<i class="fa fa-check"></i> Rejected');
        } else if (action == "remove") {
            $(commContainerElemId + " > .btn").addClass("hidden");
            $(commContainerElemId + " > div").addClass('text-success').removeClass('hidden')
              .html('<i class="fa fa-check"></i> Removed');
        }
      },
      error: function(result, status, xhr) {
        if (action == "accept" || action == "reject" || action == "remove") {
          $(commContainerElemId + " > .btn").addClass('hidden');
          $(commContainerElemId + " > div").addClass('text-danger').removeClass('hidden').text('An error occurred');
        }
      }
    });
  }
  return recordCommunityCurate;
});
